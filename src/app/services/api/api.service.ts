import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { User } from './models';

@Injectable({
    providedIn: 'root'
})
export class APIService {
    root: string = "http://localhost:5000/api";
    constructor(private httpClient : HttpClient) { }

    // Sending a GET request to /users
    // TODO broken
    /*
       public getUsers(){
       return this.httpClient
       .get(this.root + '/users')
       .map(users => {
       return users.map((user) => new User(user));
       })
       .catch((err)=>{
       console.error(err);
       });
       }
     */

    // Sending a POST request to /users
    /*
       public createUser(user: User) {

       }
     */

    // Sending a GET request to /users/:id
    public getUserById(userId: number): Observable<User> {
        return this.httpClient
        .get(this.root + '/users/' + userId)
        .map(response => {
            return new User(response);
        })
        .catch((err) => {
            console.error(err);
            return Observable.throw(err.statusText);
        });
    }

    public getMe(): Observable<User> {
        return this.httpClient
        .get(this.root + '/users/me')
        .map(response => {
            return new User(response);
        })
        .catch((err) => {
            console.error(err);
            return Observable.throw(err.statusText);
        });
    }

    // Sending a PUT request to /users/:id
    public updateUser(user: User){

    }

    // Sending a DELETE request to /users/:id
    public deleteUserById(userId: number) {

    }

}
