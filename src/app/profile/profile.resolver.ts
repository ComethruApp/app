import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, ActivatedRoute } from "@angular/router";
import { FirebaseService } from '../services/firebase.service';

@Injectable()
export class ProfileResolver implements Resolve<any> {

  constructor(public firebaseService: FirebaseService,) { }

  resolve(route: ActivatedRouteSnapshot) {
    return new Promise((resolve, reject) => {
      this.firebaseService.getMe()
      .then(data => {
        resolve(data);
      }, err => {
        reject(err);
      })
    })
  }
}
