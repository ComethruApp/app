import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Router } from '@angular/router';

import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    public auth: AuthService,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {

        // FIXME actually redirect appropriately
        this.router.navigate(['/register']);
        /*
      this.afAuth.user.subscribe(user => {
        if (user) {
          this.router.navigate(["/tabs"]);
        } else {
          this.router.navigate(["/login"]);
        }
      }, err => {
        this.router.navigate(["/login"]);
      }, () => {
        this.splashScreen.hide();
      })
      this.statusBar.styleDefault();
   */
    });
  }
}
