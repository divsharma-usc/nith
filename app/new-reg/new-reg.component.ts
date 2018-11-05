import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first,map } from 'rxjs/operators';

import { RegistrationService } from '../services/registration.service';

@Component({
  selector: 'app-new-reg',
  templateUrl: './new-reg.component.html',
  styleUrls: ['./new-reg.component.css']
})
export class NewRegComponent implements OnInit {
  
  submitted = false;
  loading = false;
  semester: string[] = ['Even', 'Odd'];
  default: string = 'Odd';
  data = {}
  regForm : FormGroup;

  constructor(
   private router : Router, 
   private route : ActivatedRoute,
   private formbuilder : FormBuilder,
   private regService : RegistrationService 
   ) { }

  ngOnInit() {
       this.regForm = this.formbuilder.group({
       year:['',Validators.required],
       semester:['',Validators.required],
       p1startDate:[,Validators.required],
       p1endDate:[,Validators.required],
       p2startDate:[,Validators.required],
       endDate:[,Validators.required]
     })
     this.regForm.controls['semester'].setValue(this.default, {onlySelf: true});
  }

  get f() { return this.regForm.controls; }
  
  onSubmit(){
 		this.submitted=true;
 		
 		if(this.regForm.invalid){
 			return;
 		}
 		
 		this.loading=true;
 		this.data['year']=this.f.year.value
 		this.data['semester']=this.f.semester.value
 		this.data['p1startDate']=this.f.p1startDate.value
 		this.data['p2startDate']=this.f.p2startDate.value
 		this.data['endDate']=this.f.endDate.value
    this.data['p1endDate']=this.f.p1endDate.value
 		this.regService.newReg(this.data)
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
