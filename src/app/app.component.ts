import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { Platform } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { APIService } from './services/api/api.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    constructor(
        private platform: Platform,
        private statusBar: StatusBar,
        private router: Router,
        private alertCtrl: AlertController,
        private api: APIService,
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.platform.ready().then(() => {
                this.statusBar.backgroundColorByHexString('#15202B');
            });
        });
        this.api.heartbeat().subscribe(beat => {
            if (beat['maintenance']) {
                this.warn('Maintenance mode',
                          'The server is currently down for scheduled maintenance. Check back soon!');
            }
            let version = 0;
            if (beat['min_version'] > version) {
                this.warn('Outdated installation',
                          'Please update Comethru through your app store! You\'ll need the newest version to continue.');
            }
        });
    }

    async warn(header: string, message: string) {
        const alert = await this.alertCtrl.create({
            header: header,
            message: message,
        });
        await alert.present();
    }
}
