import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientXsrfModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AddNewUserComponent } from './add-new-user/add-new-user.component';
import { LibraryHomeComponent } from './library-home/library-home.component';
import { HostelHomeComponent } from './hostel-home/hostel-home.component'; 
import { NewRegComponent } from './new-reg/new-reg.component';
import { EditRegComponent } from './edit-reg/edit-reg.component';
import { AddStudentsRecordComponent } from './add-students-record/add-students-record.component';
import { StudentHomeComponent } from './student-home/student-home.component';
import { DepartmentHomeComponent } from './department-home/department-home.component';

import { AuthenticationService } from './services/authentication.service';
import { AdduserService } from './services/adduser.service';
import { FileuploadService } from'./services/fileupload.service';
import { RegistrationService } from './services/registration.service';
import { StudentRecordService } from './services/student-record.service';
import { SubjectService } from './services/subject.service';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { StudentRegisterService } from './services/student-register.service';
import { StudentComponent } from './student/student.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
    AdminHomeComponent,
    AddNewUserComponent,
    LibraryHomeComponent,
    HostelHomeComponent,
    NewRegComponent,
    EditRegComponent,
    AddStudentsRecordComponent,
    StudentHomeComponent,
    DepartmentHomeComponent,
    RegistrationFormComponent,
    StudentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'csrftoken',
      headerName: 'X-CSRFToken',
    })
  ],
  providers: [
    AuthenticationService,
    AdduserService,
    FileuploadService,
    RegistrationService,
    StudentRecordService,
    SubjectService,
    StudentRegisterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
