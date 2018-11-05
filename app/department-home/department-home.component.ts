import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first,map } from 'rxjs/operators';

import { SubjectService } from'../services/subject.service'; 

@Component({
  selector: 'app-department-home',
  templateUrl: './department-home.component.html',
  styleUrls: ['./department-home.component.css']
})
export class DepartmentHomeComponent implements OnInit {

  
  departments : string[] = ['CSE','ECE','Civil','EEE','Mechanical','Chemical','Architecture'];
  courses : string[] = ['BTech','MTech','MSc','Phd'];
  semesters : string[] = ['1','2','3','4','5','6','7','8','9','10'];
  defaultDept : string = 'CSE';
  defaultCourse : string = 'Btech';
  defaultSem : string = '1';
  docForm : FormGroup;
  
  constructor(
  		private http: HttpClient, 
   		private el: ElementRef,
  		private subService: SubjectService,
   		private router:Router, 
   		private route:ActivatedRoute,
   		private formbuilder:FormBuilder,
  ) { }

  ngOnInit() {
     this.docForm = this.formbuilder.group({
       semester:['',Validators.required],
       dept:['',Validators.required],
       course:['',Validators.required]
     })
     this.docForm.controls['dept'].setValue(this.defaultDept, {onlySelf: true});
     this.docForm.controls['course'].setValue(this.defaultCourse,{onlySelf:true});
     this.docForm.controls['semester'].setValue(this.defaultSem,{onlySelf:true});
  }

  get f() { return this.docForm.controls; }

   upload() {
  		  
        
        if(this.docForm.invalid){
           return;
        }

        let formData = new FormData();
        let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#doc');
        let fileCount: number = inputEl.files.length;
        if (fileCount > 0) { 
                formData.append('doc', inputEl.files.item(0));
                formData.append('semester',this.f.semester.value);
                formData.append('department',this.f.dept.value);
                formData.append('course',this.f.course.value);
        }
       this.subService.upload(formData)
       .pipe(first())
       .subscribe(
        data=>{
            window.alert(data['msg'])
            window.location.reload()
        },
        error=>{
          
        }
       );
   }

}
