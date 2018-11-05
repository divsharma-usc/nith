import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first,map } from 'rxjs/operators';

import { FileuploadService } from'../services/fileupload.service'; 


@Component({
  selector: 'app-hostel-home',
  templateUrl: './hostel-home.component.html',
  styleUrls: ['./hostel-home.component.css']
})
export class HostelHomeComponent implements OnInit {

  semester: string[] = ['Even', 'Odd'];
  default: string = 'Odd';
  hosteldocForm : FormGroup;
  user: string = '';

  constructor(
   private http: HttpClient, 
   private el: ElementRef,
   private fileuploadService:FileuploadService,
   private router:Router, 
   private route:ActivatedRoute,
   private formbuilder:FormBuilder,
   ) { }

  ngOnInit() {
       this.hosteldocForm = this.formbuilder.group({
       year:['',Validators.required],
       semester:['',Validators.required]
     })
     this.hosteldocForm.controls['semester'].setValue(this.default, {onlySelf: true});
  }
  
  get f() { return this.hosteldocForm.controls; }

  hostelupload() {
  		  
        
        if(this.hosteldocForm.invalid){
           return;
        }

        this.user = JSON.parse(atob(JSON.parse(localStorage.getItem('currentUser')).token.split('.')[1]))['user']

        let formData = new FormData();
        let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#doc');
        let fileCount: number = inputEl.files.length;
        if (fileCount > 0) { 
                formData.append('doc', inputEl.files.item(0));
                formData.append('year',this.f.year.value);
                formData.append('semester',this.f.semester.value);
                formData.append('user',this.user);
        }
       this.fileuploadService.hostelupload(formData)
       .pipe(first())
       .subscribe(
        data=>{
            
        },
        error=>{
          
        }
       );
   }

}
