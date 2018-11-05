import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../environment';

@Injectable()
export class RegistrationService {

  constructor(private http: HttpClient) { }

  checkStatus(){

    const httpOptions = {
              headers: new HttpHeaders({
                   'Content-Type':  'application/json',
                   'Authorization': environment.auth_token
              })
          };

    const url='http://'+environment.backend_host+':'+environment.backend_port+'/registrationapi/checkstatus/';
    
    return this.http.get(url,httpOptions)
  }

  
  getRegData(){
    const httpOptions = {
              headers: new HttpHeaders({
                   'Content-Type':  'application/json',
                   'Authorization': environment.auth_token
              })
          };

    const url ='http://'+environment.backend_host+':'+environment.backend_port+'/registrationapi/getReg/';
    
    return this.http.get(url,httpOptions)
  }

  
  newReg(data){

    const httpOptions = {
              headers: new HttpHeaders({
                   'Content-Type':  'application/json',
                   'Authorization': environment.auth_token
              })
          };

    const url = 'http://'+environment.backend_host+':'+environment.backend_port+'/registrationapi/newReg/';

  	return this.http.post<any>(url,{data},httpOptions)
               .pipe(map(res => {
                  if (res) {
                      console.log(res)
                  }
                  return res;
            }));
  }

  
  stopReg(){

    const httpOptions = {
              headers: new HttpHeaders({
                   'Content-Type':  'application/json',
                   'Authorization': environment.auth_token
              })
         };

    const url ='http://'+environment.backend_host+':'+environment.backend_port+'/registrationapi/stopReg/';

    return this.http.post<any>(url,{'msg':'stop'},httpOptions)
               .pipe(map(res => {
                  if (res) {
                      console.log(res)
                      return true;
                  }
                      return false;
                }));
  }

  
  getRegInfo(data){
    const httpOptions = {
              headers: new HttpHeaders({
                   'Content-Type':  'application/json',
                   'Authorization': environment.auth_token
              })
          };

    const url = 'http://'+environment.backend_host+':'+environment.backend_port+'/registrationapi/getRegInfo/';
    
    return this.http.post<any>(url,{data},httpOptions)
               .pipe(map(res => {
                  if (res) {
                  }
                  return res;
            }));

  }
}
