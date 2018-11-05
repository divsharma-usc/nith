import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../environment';

@Injectable()
export class StudentRegisterService {
    constructor(private http: HttpClient) { }

    upload(data) {

        const httpOptions = {
              headers: new HttpHeaders({
                   'Content-Type':  'application/json',
                   'Authorization': environment.auth_token
              })
        };

        const url = 'http://'+environment.backend_host+':'+environment.backend_port+'/sturegapi/upload/';

        return this.http.post<any>(url,data,httpOptions)
                   .pipe(map(res => {
                        if (res) {
                            console.log(res)
                        }
                        return res;
                    }));
    }

    getData(data){

        const httpOptions = {
              headers: new HttpHeaders({
                   'Content-Type':  'application/json',
                   'Authorization': environment.auth_token
              })
        };

        const url = 'http://'+environment.backend_host+':'+environment.backend_port+'/sturegapi/getData/';

        return this.http.post<any>(url,data,httpOptions)
                   .pipe(map(res => {
                        if (res) {
                            console.log(res)
                    }
                    return res;
                }));  
    }
}