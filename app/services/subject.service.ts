import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http: HttpClient) { }

    upload(data) {

        const httpOptions = {
              headers: new HttpHeaders({
                   'Content-Type':  'application/json',
                   'Authorization': environment.auth_token
              })
        };

        const url = 'http://'+environment.backend_host+':'+environment.backend_port+'/subjectapi/uploadsub/';

        return this.http.post(url,data,httpOptions).pipe(map(data => {
                return data
            }));
    }

    getSubs(data){

        const httpOptions = {
              headers: new HttpHeaders({
                   'Content-Type':  'application/json',
                   'Authorization': environment.auth_token
              })
        };

        const url = 'http://'+environment.backend_host+':'+environment.backend_port+'/subjectapi/getSubs/';

    	return this.http.post(url,data,httpOptions).pipe(map(data => {
    		    console.log(data)
                return data
        }));
    }

    isStuRegisterd(data){

        const httpOptions = {
              headers: new HttpHeaders({
                   'Content-Type':  'application/json',
                   'Authorization': environment.auth_token
              })
        };

        const url = 'http://'+environment.backend_host+':'+environment.backend_port+'/sturegapi/isStudentRegisterd/';

        return this.http.post(url,data,httpOptions).pipe(map(data => {
                console.log(data)
                return data
        }));
    }
}
