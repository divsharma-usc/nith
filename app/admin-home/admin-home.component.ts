import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService } from '../services/registration.service';


@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
    constructor(
  	private router:Router,
  	private registrationService : RegistrationService,
  ) {}

  ngOnInit() {
  }

  addNewUser(){
  	this.router.navigateByUrl('addNewUser')
  }

  manageStudents(){
    this.router.navigateByUrl('addStudentRecords')
  }
  
  startRegistration(){
  	this.registrationService.checkStatus().subscribe((data) => {
    if( data['status'] ){
      		this.router.navigateByUrl('newRegistration')
    }
  	else{
  		this.router.navigateByUrl('editRegistration')
  	}});
  }
}
