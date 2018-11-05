import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
 
import { LoginComponent }   from './login/login.component';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AddNewUserComponent } from './add-new-user/add-new-user.component'; 
import { LibraryHomeComponent } from './library-home/library-home.component';
import { HostelHomeComponent } from  './hostel-home/hostel-home.component';
import { NewRegComponent } from './new-reg/new-reg.component';
import { EditRegComponent } from './edit-reg/edit-reg.component';
import { AddStudentsRecordComponent } from'./add-students-record/add-students-record.component';
import { StudentHomeComponent } from './student-home/student-home.component';
import { DepartmentHomeComponent } from './department-home/department-home.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { StudentComponent } from './student/student.component';


import { AuthGuard } from './_guards/auth.guard';
import { StuGuard } from './_guards/stu.guard';

const appRoutes: Routes = [
  { path:'', component:AppComponent, canActivate:[AuthGuard] },
  { path:'adminHome',component:AdminHomeComponent,canActivate:[AuthGuard] },
  { path:'addNewUser',component:AddNewUserComponent,canActivate:[AuthGuard] },
  { path:'libraryHome',component:LibraryHomeComponent,canActivate:[AuthGuard] },
  { path:'hostelHome',component:HostelHomeComponent,canActivate:[AuthGuard] },
  { path:'newRegistration',component:NewRegComponent,canActivate:[AuthGuard] },
  { path:'editRegistration',component:EditRegComponent,canActivate:[AuthGuard] },
  { path:'addStudentRecords',component:AddStudentsRecordComponent,canActivate:[AuthGuard] },
  { path:'studentHome',component:StudentHomeComponent,canActivate:[StuGuard]},
  { path:'register',component:RegistrationFormComponent,canActivate:[StuGuard]},
  { path:'studentApplication',component:StudentComponent,canActivate:[StuGuard]},
  { path:'departmentHome',component:DepartmentHomeComponent,canActivate:[AuthGuard]},
  { path:'login', component:LoginComponent },
  { path:'**', component:PageNotFoundComponent }
];
 
@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes
    )
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthGuard
  ]
})
export class AppRoutingModule {}
