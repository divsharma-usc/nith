import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../environment';

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) { }



    login(username: string, password: string) {
        const httpOptions = {
              headers: new HttpHeaders({
                  'Content-Type':  'application/json',
                   'Authorization': environment.auth_token
              })
        };
        const url = 'http://'+environment.backend_host+':'+environment.backend_port+'/userapi/userlogin/'
        return this.http.post<any>(url, { username: username, password: password },httpOptions)
            .pipe(map(user => {
                if (user && user.token) {
                   // store user details and jwt token in local storage to keep user logged in between page refreshes
                   localStorage.setItem('currentUser', JSON.stringify(user));
                }
                return user;
            }));
    }
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}