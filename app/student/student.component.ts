import { Component, OnInit } from '@angular/core';

import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

import { SubjectService } from '../services/subject.service';
import { StudentRecordService } from '../services/student-record.service';
import { StudentRegisterService } from '../services/student-register.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  subs_data = {};
  stu_data = {};
  reg_data = {};
  rollno:string = '';
  email:string = '';
  semester:string = '';
  department:string = '';
  course:string = '';

  L_total : number = 0;
  T_total : number = 0;
  P_total : number = 0;


  constructor(
  		private subService : SubjectService,
  		private stuRegService : StudentRegisterService,
  		private stuService : StudentRecordService
  ) { }

  ngOnInit() {
       this.email = localStorage.getItem('currentStudent')

       console.log(this.email)    
  	   
  	   this.stuService.getStudentData({'email':this.email}).subscribe((data)=>{
  	   		this.stu_data=data
  	   		this.rollno = data['rollno']
          this.department = data['department']
          this.course = data['course']
  	   		this.stuRegService.getData({'rollno':this.rollno}).subscribe(data=>{
       			this.reg_data=data
             this.semester=data['semester']
             this.subService.getSubs({'department':this.department,'course':this.course,'semester':this.semester}).subscribe((data)=>{
                 this.subs_data = data
                 this.getTotalCredits(this.subs_data)
             });
       		});
       });
  }

  getTotalCredits(data){
      for(let i = 0;i<data['length'];i++){
        this.L_total+=parseInt(data['data'][i]['L_credits'])
        this.T_total+=parseInt(data['data'][i]['T_credits'])
        this.P_total+=parseInt(data['data'][i]['P_credits'])
      }
  }

  captureScreen(){
     var data = document.getElementById('contentToPDF');
     html2canvas(data).then(canvas => {
       // Few necessary setting options
       var imgWidth = 208;
       var pageHeight = 295;
       var imgHeight = canvas.height * imgWidth / canvas.width;
       var heightLeft = imgHeight;
 
       const contentDataURL = canvas.toDataURL('image/png')
       let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
       var position = 0;
       pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
       pdf.save('registrationForm.pdf'); // Generated PDF
    });
  }

}
