import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
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
        private statusBar: StatusBar,
        private router: Router,
        public authService: AuthService,
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.platform.ready().then(() => {
                this.statusBar.backgroundColorByHexString('#15202B');
            });
        });
    }
}
