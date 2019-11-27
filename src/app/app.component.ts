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
        private alertCtrl: AlertController
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
            if (beat.maintenance) {
                const alert = await this.alertCtrl.create({
                    header: 'Maintenance mode',
                    message: 'The server is currently under scheduled maintenance. Check back soon!',
                    buttons: [
                        {
                            text: 'Gotchu',
                            handler: () => {

                            }
                        }
                    ]
                });
                await alert.present();
            }
        });
    }
}
