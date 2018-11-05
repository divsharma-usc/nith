import { Component, OnInit, NgZone} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first,map } from 'rxjs/operators';

import { AuthenticationService } from '../services/authentication.service';

//new added
declare const gapi: any;

@Component({
  selector:'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	submitted = false;
	loading = false;
	loginForm : FormGroup;
	public auth2: any;

	constructor(
		private formbuilder:FormBuilder,
		private router:Router,
		private route:ActivatedRoute,
		private authenticationService:AuthenticationService,
    private _ngZone : NgZone
	){  }

 	ngOnInit(){
 		this.loginForm = this.formbuilder.group({
 			email:['',Validators.required],
 			password:['',Validators.required]
 		})
 		this.googleInit();
 	}

 	get f() { return this.loginForm.controls; }

 	onSubmit(){
 		this.submitted=true;
 		
 		if(this.loginForm.invalid){
 			return;
 		}
 		
 		this.loading=true;

 		this.authenticationService.login(this.f.email.value,this.f.password.value)
 			.pipe(first())
 			.subscribe(
 				data=>{
 						if(data['role']==1)
 						  this.router.navigate(['/adminHome']);	
            else if (data['role']==2)
              this.router.navigate(['/hostelHome']);
 					  else if(data['role']==3)
 					    this.router.navigate(['/libraryHome']);
            else if(data['role']==4)
              this.router.navigate(['/departmentHome']);
            else{
              window.alert(data['error'])
              this.loading=false;   
            }
 				},
 				error=>{
          window.alert(error['error']['msg'])
 					this.loading=false;
 				}
 			);
 	}

 	//newadded

  	public googleInit() {
    	gapi.load('auth2', () => {
      	this.auth2 = gapi.auth2.init({
        	client_id: '323691116739-6lj35jm3h205nlbft3c8u4ljjda8babc.apps.googleusercontent.com',
        	cookiepolicy: 'single_host_origin',
        	scope: 'profile email'
      	});
      	this.attachSignin(document.getElementById('googleBtn'));
   	 });
  	}

  	public attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {

        let profile = googleUser.getBasicProfile();
         /* 
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        */
        this._ngZone.run(()=>{
        localStorage.setItem('currentStudent', profile.getEmail());
        this.router.navigate(['/studentHome']); 
        }); 
      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  	}
}

