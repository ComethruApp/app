import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
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
        public facebook: Facebook,
        private router: Router
    ) {}

    ngOnInit() {}

    facebookLogin(): Promise<any> {
      return this.facebook.login(['email'])
        .then( response => {
          const facebookCredential = firebase.auth.FacebookAuthProvider
            .credential(response.authResponse.accessToken);

          firebase.auth().signInWithCredential(facebookCredential)
            .then( success => {
              console.log("Firebase success: " + JSON.stringify(success));
            });

        }).catch((error) => { console.log(error) });

                .then( success => {
                  console.log("Firebase success: " + JSON.stringify(success));
                });

            }).catch((error) => { console.log(error) });
    }
}


