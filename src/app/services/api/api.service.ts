import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { User } from './models.ts';

@Injectable({
  providedIn: 'root'
})
export class APIService {
  root: string = "http://localhost:5000/api";
  constructor(private httpClient : HttpClient) { }

  // Sending a GET request to /users
  public getUsers(){

  }

  // Sending a POST request to /users
  /*
  public createUser(user: User) {

  }
 */

  // Sending a GET request to /users/:id
  public getUserById(userId: number) {

  }

  // Sending a PUT request to /users/:id
  public updateUser(user: User){

  }

  // Sending a DELETE request to /users/:id
  public deleteUserById(userId: number) {

  }

}
