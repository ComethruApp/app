import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { Platform } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

import { APIService } from './services/api/api.service';
import { LocationService } from './services/location/location.service';

import { OneSignal } from '@ionic-native/onesignal/ngx';

import * as Constants from './constants';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    constructor(
        private platform: Platform,
        private statusBar: StatusBar,
        private splashScreen: SplashScreen,
        private router: Router,
        private alertCtrl: AlertController,
        private api: APIService,
        private locationService: LocationService,
        private oneSignal: OneSignal,
    ) {
        this.initializeApp();
    }

    completeNotificationTask(task) {
        if (task) {
            this.router.navigate(['/' + task.join('/')]);
        }
    }

    setupPush() {
        this.oneSignal.startInit(Constants.ONESIGNAL_APPID, Constants.GOOGLE_PROJECT_NUMBER);
        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.None);
        this.oneSignal.handleNotificationReceived().subscribe(data => {
            // TODO: add toast
            /*
            this.showAlert(data.payload.title,
                           data.payload.body,
                           data.payload.additionalData.task);
             */
        });
        this.oneSignal.handleNotificationOpened().subscribe(data => {
            let task = data.notification.payload.additionalData.task;
            this.completeNotificationTask(task);
        });
        this.oneSignal.endInit();
    }

    async showAlert(title, message, task) {
        const alert = await this.alertCtrl.create({
            header: title,
            subHeader: message,
            buttons: [
                {
                    text: 'OK',
                },
                {
                    text: 'View',
                    handler: () => {
                        this.completeNotificationTask(task);
                    },
                },
            ],
        });
        await alert.present();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            if (this.platform.is('cordova')) {
                this.setupPush();
            }
            this.platform.ready().then(() => {
                this.statusBar.backgroundColorByHexString('#15202B');
            });
            this.splashScreen.hide();
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
        this.locationService.launch();
    }

    async warn(header: string, message: string) {
        const alert = await this.alertCtrl.create({
            header: header,
            message: message,
        });
        await alert.present();
    }
}
