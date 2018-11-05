import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first,map } from 'rxjs/operators';

import { StudentRecordService } from'../services/student-record.service'; 

@Component({
  selector: 'app-add-students-record',
  templateUrl: './add-students-record.component.html',
  styleUrls: ['./add-students-record.component.css']
})
export class AddStudentsRecordComponent implements OnInit {

 
  departments : string[] = ['CSE','ECE','Civil','EEE','Mechanical','Chemical','Architecture'];
  courses : string[] = ['BTech','MTech','MSc','Phd'];
  defaultDept : string = 'CSE';
  defaultCourse : string = 'Btech';
  docForm : FormGroup;
  
  constructor(
  		private http: HttpClient, 
   		private el: ElementRef,
  		private stuService: StudentRecordService,
   		private router:Router, 
   		private route:ActivatedRoute,
   		private formbuilder:FormBuilder,
  ) { }

  ngOnInit() {
     this.docForm = this.formbuilder.group({
       year:['',Validators.required],
       dept:['',Validators.required],
       course:['',Validators.required]
     })
     this.docForm.controls['dept'].setValue(this.defaultDept, {onlySelf: true});
     this.docForm.controls['course'].setValue(this.defaultCourse, {onlySelf: true});
  }

  get f() { return this.docForm.controls; }

  hostelupload() {
  		  
        
        if(this.docForm.invalid){
           return;
        }

        let formData = new FormData();
        let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#doc');
        let fileCount: number = inputEl.files.length;
        if (fileCount > 0) { 
                formData.append('doc', inputEl.files.item(0));
                formData.append('year',this.f.year.value);
                formData.append('department',this.f.dept.value);
                formData.append('course',this.f.course.value);
        }
       this.stuService.upload(formData)
       .pipe(first())
       .subscribe(
        data=>{
           
        },
        error=>{
          
        }
       );
   }

}
