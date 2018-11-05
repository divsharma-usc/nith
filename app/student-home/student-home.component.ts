import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../services/registration.service';
import { first,map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

import { SubjectService } from '../services/subject.service';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.css']
})
export class StudentHomeComponent implements OnInit {
  
  email:string = '';
  isRegistered:boolean = false;
  public data_obj = {};
  public reg_Status = 'false'


  constructor(
  		private registrationServide:RegistrationService,
      private router:Router,
      private route:ActivatedRoute,
      private subService : SubjectService
  ) { 
      this.email = localStorage.getItem('currentStudent');
      this.registrationServide.getRegInfo({'email':this.email}).subscribe((data)=>{
      this.data_obj=data
      console.log(this.data_obj)
    });

  }

  ngOnInit() {
  		this.email = localStorage.getItem('currentStudent');
      this.subService.isStuRegisterd({'email':this.email}).subscribe(data=>{
        this.isRegistered = data['isStudentRegisterd']
      })
  }

  clicked(){
    this.router.navigate(['/register']);
  }

  clicked2(){
    this.router.navigate(['/studentApplication']);
  }
}
