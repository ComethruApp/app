import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Geolocation, GeolocationOptions, Geoposition } from '@ionic-native/geolocation/ngx';
import { APIService } from '../api/api.service';

@Injectable({
    providedIn: 'root'
})
export class LocationService {
    watch: any;
    private debug: boolean = false;

    constructor(
        private geolocation: Geolocation,
        private alertCtrl: AlertController,
        private api: APIService,
    ) { }

    startTracking() {
        this.watch = this.geolocation.watchPosition(/*{
            frequency: 15000,
            enableHighAccuracy: true,
        }*/);
        this.watch.subscribe((position: Geoposition) => {
            if (position != undefined) {
                console.log('Got new position!', position);
                this.api.sendLocation(position.coords.latitude, position.coords.longitude).subscribe(response => {
                    if (this.debug) {
                        this.warn('Location response', JSON.stringify(response));
                    }
                });
            }
        });
    }

    stopTracking() {
        this.watch.unsubscribe();
        console.log('Ended tracking.');
    }

    async warn(header: string, message: string) {
        const alert = await this.alertCtrl.create({
            header: header,
            message: message,
        });
        await alert.present();
    }
}
