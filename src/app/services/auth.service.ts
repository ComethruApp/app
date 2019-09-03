import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { Facebook } from '@ionic-native/facebook/ngx';
import { FirebaseService } from './firebase.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private firebaseService: FirebaseService,
    public afAuth: AngularFireAuth,
    public facebook: Facebook,
  ){}

  /*
  doRegister(value){
   return new Promise<any>((resolve, reject) => {
     firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
     .then(
       res => resolve(res),
       err => reject(err))
   })
  }
  */

  doLogin(value){
      return new Promise((resolve, reject) => {
          this.facebook.login(['email']).then(response => {
              const facebookCredential = firebase.auth.FacebookAuthProvider
                .credential(response.authResponse.accessToken);

              firebase.auth().signInWithCredential(facebookCredential);
          });
      }
  }

  doLogout(){
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signOut()
      .then(() => {
        this.firebaseService.unsubscribeOnLogOut();
        resolve();
      }).catch((error) => {
        console.log(error);
        reject();
      });
    })
  }
}
