import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { Facebook } from '@ionic-native/facebook/ngx';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
    FB_APP_ID: number = 567699137099186;

    errorMessage: string = '';
/*
  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
  }

  tryLogin(value){
    this.authService.doLogin(value)
    .then(res => {
      this.router.navigate(["/home"]);
    }, err => {
      this.errorMessage = err.message;
      console.log(err)
    })
  }

*/
    constructor(
        private authService: AuthService,
        private router: Router,
        public facebook: Facebook,
    ) {}

    ngOnInit(): void {}

    facebookLogin(): Promise<any> {
      return this.facebook.login(['email', 'public_profile']).then(response => {
          const facebookCredential = firebase.auth.FacebookAuthProvider
            .credential(response.authResponse.accessToken);

          firebase.auth().signInWithCredential(facebookCredential);
      }).then(success => {
          console.log("Firebase success: " + JSON.stringify(success));
      }).catch((error) => {
          console.log(error)
      });
    }
}


