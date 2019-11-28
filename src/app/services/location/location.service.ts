import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationEvents, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation/ngx';
import { APIService } from '../api/api.service';

@Injectable({
    providedIn: 'root'
})
export class LocationService {

    constructor(
        private backgroundGeolocation: BackgroundGeolocation,
        private alertCtrl: AlertController,
        private api: APIService,
    ) { }

    startBackgroundGeolocation() {
        const config: BackgroundGeolocationConfig = {
            desiredAccuracy: 10,
            stationaryRadius: 20,
            distanceFilter: 30,
            debug: true, //  enable this hear sounds for background-geolocation life-cycle.
            stopOnTerminate: false, // enable this to clear background location settings when the app terminates
        };

        this.backgroundGeolocation.configure(config)
        .then(() => {
            this.backgroundGeolocation.on(BackgroundGeolocationEvents.location).subscribe((location: BackgroundGeolocationResponse) => {
                //this.warn('Location update', JSON.stringify(location));
                //this.api.sendLocation(location.latitude, location.longitude);
                this.api.sendLocation(location.latitude, location.longitude).subscribe(response => {
                    this.warn('Location response', JSON.stringify(response));
                });

                this.backgroundGeolocation.finish(); // FOR IOS ONLY
            });

        });

        // start recording location
        this.backgroundGeolocation.start();

        // If you wish to turn OFF background-tracking, call the #stop method.
        //this.backgroundGeolocation.stop();
    }

    async warn(header: string, message: string) {
        const alert = await this.alertCtrl.create({
            header: header,
            message: message,
        });
        await alert.present();
    }
}
