import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class StudentRecordService {

    constructor(private http: HttpClient) { }

    upload(data) {
        const httpOptions = {
              headers: new HttpHeaders({
                   'Content-Type':  'application/json',
                   'Authorization': environment.auth_token
              })
        };

        const url = 'http://'+environment.backend_host+':'+environment.backend_port+'/studentapi/uploaddoc/'

        return this.http.post<any>(url,data,httpOptions)
            .pipe(map(res => {
                if (res) {
                    console.log(res)
                }
                return res;
            }));
    }

    getStudentData(data){

        const httpOptions = {
              headers: new HttpHeaders({
                   'Content-Type':  'application/json',
                   'Authorization': environment.auth_token
              })
        };

        const url = 'http://'+environment.backend_host+':'+environment.backend_port+'/studentapi/getData/';

        return this.http.post<any>(url,data,httpOptions)
                   .pipe(map(res=>{
                        if(res){
                            console.log(res);
                        }
                    return res;
                }));
    }
}
