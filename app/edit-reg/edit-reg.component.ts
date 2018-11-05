import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first,map } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { RegistrationService } from '../services/registration.service';

@Component({
  selector: 'app-edit-reg',
  templateUrl: './edit-reg.component.html',
  styleUrls: ['./edit-reg.component.css']
})
export class EditRegComponent implements OnInit {

  submitted = false;
  loading = false;
  semester: string[] = ['Even', 'Odd'];
  default: string = 'Odd';
  data = {};
  editRegForm : FormGroup;
  sem : string;

  constructor(
  	private router:Router,
  	private registrationService : RegistrationService,
    private formbuilder : FormBuilder,
  ) { }

  ngOnInit() {
      this.editRegForm = this.formbuilder.group({
       year:['',Validators.required],
       semester:['',Validators.required],
       p1startDate:[,Validators.required],
       p1endDate:[,Validators.required],
       p2startDate:[,Validators.required],
       endDate:[,Validators.required]
       })
       this.registrationService.getRegData()
       .pipe(first())
       .subscribe(
        data=>{
            if(data){
              if(data['semester']==0)
                this.sem='Even'
              else
                this.sem='Odd'
              this.editRegForm.controls['year'].setValue(data['year'], {onlySelf: true});
              this.editRegForm.controls['semester'].setValue(this.sem, {onlySelf: true});
              this.editRegForm.controls['p1startDate'].setValue(data['p1date'], {onlySelf: true});
              this.editRegForm.controls['p2startDate'].setValue(data['p2date'], {onlySelf: true});
              this.editRegForm.controls['endDate'].setValue(data['enddate'], {onlySelf: true});
              this.editRegForm.controls['p1endDate'].setValue(data['p1enddate'],{onSelf:true})
            }
        },
        error=>{
          
        });
  }
  
  stopRegistration(){
  	this.registrationService.stopReg()
       .pipe(first())
       .subscribe(
        data=>{
            if(data)
              this.router.navigateByUrl('adminHome')
        },
        error=>{
          
        });
  }

  get f() { return this.editRegForm.controls; }
  
  onSubmit(){
     this.submitted=true;
     
     if(this.editRegForm.invalid){
       return;
     }
     
     this.loading=true;
     this.data['year']=this.f.year.value
     this.data['semester']=this.f.semester.value
     this.data['p1startDate']=this.f.p1startDate.value
     this.data['p2startDate']=this.f.p2startDate.value
     this.data['endDate']=this.f.endDate.value
     this.data['p1endDate']=this.f.p1endDate.value
     this.registrationService.newReg(this.data)
       .pipe(first())
       .subscribe(
         data=>{ 
             this.router.navigate(['/adminHome']);  
         },
         error=>{
               this.loading=false;
           }  
       );
  }
}
