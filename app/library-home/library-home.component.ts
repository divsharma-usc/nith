import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first,map } from 'rxjs/operators';

import { FileuploadService } from'../services/fileupload.service'; 

@Component({
  selector: 'app-library-home',
  templateUrl: './library-home.component.html',
  styleUrls: ['./library-home.component.css']
})
export class LibraryHomeComponent implements OnInit {

  semester: string[] = ['Even', 'Odd'];
  default: string = 'Odd';
  docForm : FormGroup;

  constructor(
   private http: HttpClient, 
   private el: ElementRef,
   private fileuploadService:FileuploadService,
   private router:Router, 
   private route:ActivatedRoute,
   private formbuilder:FormBuilder,
   ) { }

  ngOnInit() {
       this.docForm = this.formbuilder.group({
       year:['',Validators.required],
       semester:['',Validators.required],
     })
     this.docForm.controls['semester'].setValue(this.default, {onlySelf: true});
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
                formData.append('year',this.f.year.value);
                formData.append('semester',this.f.semester.value);
        }
       this.fileuploadService.upload(formData)
       .pipe(first())
       .subscribe(
        data=>{
            
        },
        error=>{
          
        }
       );
   }
}
