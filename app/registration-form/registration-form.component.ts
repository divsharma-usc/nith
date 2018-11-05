import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first,map } from 'rxjs/operators';


import { StudentRecordService } from '../services/student-record.service';
import { StudentRegisterService } from '../services/student-register.service';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {

  submitted = false;
  loading = false;

  stu_data = {};
  email:string = '';
  semester:string = '';
  semesters:string[] = ['1','2','3','4','5','6','7','8','9','10'];
  genders:string[]=['male','female','other'];
  hostelers:string[]=['yes','no'];
  defaultSem : string = '1';
  semForm : FormGroup;
  regForm : FormGroup;
  part2 : Boolean = false;
  address : string = '';
   
  constructor(
  	private stuService : StudentRecordService,
    private http: HttpClient, 
    private el: ElementRef,
    private router:Router, 
    private route:ActivatedRoute,
    private formbuilder:FormBuilder,
    private stuRegService : StudentRegisterService
  ) { }

  ngOnInit() {
  	this.email = localStorage.getItem('currentStudent')    
  	this.stuService.getStudentData({'email':this.email}).subscribe((data)=>{
  	    this.stu_data=data
    });

    this.semForm = this.formbuilder.group({
       semester:['',Validators.required],
    })

    this.regForm = this.formbuilder.group({
       name : ['',Validators.required],
       fathername : ['',Validators.required],
       gender : ['',Validators.required],
       phone : ['',Validators.required],
       dob : ['',Validators.required],
       permanentAddress : ['',Validators.required],
       correspondanceAddress : ['',Validators.required],
       hosteler : ['',Validators.required],
       parentPhone : ['',Validators.required],
       parentEmail : ['',Validators.required],
    })

    this.semForm.controls['semester'].setValue(this.defaultSem,{onlySelf:true});
    this.regForm.controls['gender'].setValue('female',{onlySelf:true});
    this.regForm.controls['hosteler'].setValue('yes',{onlySelf:true});

  }

   get f() { return this.semForm.controls; }
   get g() { return this.regForm.controls; }

   onSemSubmit(){
     this.part2 = true;
   }
   
   setAddress(e) {
     if(e.target.checked){   
            this.address = this.g.correspondanceAddress.value;
            this.regForm.controls['permanentAddress'].setValue(this.address,{onlySelf:true});
     }
     else{
            this.regForm.controls['permanentAddress'].setValue('',{onlySelf:true}); 
     }
   }

   onSubmit(){

        this.submitted=true;

        if(this.regForm.invalid){
           return;
        }

        this.loading=true;

        let formData = new FormData();
        formData.append('email',this.email);
        formData.append('rollno',this.stu_data['rollno']);
        formData.append('semester',this.f.semester.value);
        formData.append('name',this.g.name.value);
        formData.append('fathername',this.g.fathername.value);
        formData.append('gender',this.g.gender.value);
        formData.append('phone',this.g.phone.value);
        formData.append('dob',this.g.dob.value);
        formData.append('permanentAddress',this.g.permanentAddress.value);
        formData.append('correspondanceAddress',this.g.correspondanceAddress.value);
        formData.append('hosteler',this.g.hosteler.value);
        formData.append('parentPhone',this.g.parentPhone.value);
        formData.append('parentEmail',this.g.parentEmail.value);

        console.log(formData)

        this.stuRegService.upload(formData)
        .pipe(first())
        .subscribe(
        data=>{
            this.router.navigate(['/studentApplication']); 
        },
        error=>{
          
        }
       );

   }
}
