import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../environment';

@Injectable()
export class AdduserService {
    constructor(private http: HttpClient) { }

    addUser(data) {
        const httpOptions = {
              headers: new HttpHeaders({
                  'Content-Type':  'application/json',
                   'Authorization': environment.auth_token
              })
        };
        const url = 'http://'+environment.backend_host+':'+environment.backend_port+'/userapi/adduser/';
        return this.http.post<any>(url,{
                username:data['username'],
                email:data['email'],
                role:data['role'],
                userdetail:data['userdetail']
            },httpOptions)
            .pipe(map(res => {
                if (res) {
                    console.log(res)
                }
                return res;
            }));
    }
}