import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first,map } from 'rxjs/operators';

import { AdduserService } from '../services/adduser.service';


@Component({
  selector: 'app-add-new-user',
  templateUrl: './add-new-user.component.html',
  styleUrls: ['./add-new-user.component.css']
})
export class AddNewUserComponent implements OnInit {

    submitted = false;
	loading = false;
	newUserForm : FormGroup;
    IsHostel = false;
	userTypes: string[] = ['Library', 'Hostel','Department'];
	default: string = 'Library';
	data = {}
	

	constructor(
		private formbuilder:FormBuilder,
		private router:Router,
		private route:ActivatedRoute,
		private addUserService:AdduserService
	){}

 	ngOnInit(){
 		this.newUserForm = this.formbuilder.group({
 			username:['',Validators.required],
 			email:['',Validators.required],
 			userType:['',Validators.required],
 			org:['Library',Validators.required],
 		})
 		this.newUserForm.controls['userType'].setValue(this.default, {onlySelf: true});
 	}

 	get f() { return this.newUserForm.controls; }

 	onSubmit(){
 		this.submitted=true;
 		
 		if(this.newUserForm.invalid){
 			return;
 		}
 		
 		this.loading=true;
 		this.data['username']=this.f.username.value
 		this.data['email']=this.f.email.value
 		this.data['role']=this.f.userType.value
 		this.data['userdetail']=this.f.org.value.toLowerCase();
 		this.addUserService.addUser(this.data)
 			.pipe(first())
 			.subscribe(
 				data=>{ 
 						this.router.navigate(['/adminHome']);	
 				},
 				error=>{
 					    window.alert(error['error']['msg'])
 				    	this.loading=false;
 			    }  
 			);
 	}
}
