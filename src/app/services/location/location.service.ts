import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Geolocation, GeolocationOptions, Geoposition } from '@ionic-native/geolocation/ngx';
import { Storage } from '@ionic/storage';
import { APIService } from '../api/api.service';

@Injectable({
    providedIn: 'root'
})
export class LocationService {
    watch: any;
    private debug: boolean = false;
    lastLat: number;
    lastLng: number;

    constructor(
        private storage: Storage,
        private geolocation: Geolocation,
        private alertCtrl: AlertController,
        private api: APIService,
    ) { }

    /* Check enabled status, and launch if location sending is on. */
    launch() {
        this.storage.get('USE_LOCATION').then(useLocation => {
            if (useLocation == null || useLocation) {
                this.startTracking();
            }
        });
    }

    startTracking() {
        let options: GeolocationOptions = {
            timeout: 5 * 1000,
            enableHighAccuracy: true,
        };
        this.watch = this.geolocation.watchPosition(options);
        this.watch.subscribe((position: Geoposition) => {
            if (position && position.coords) {
                if (position.coords.latitude == this.lastLat && position.coords.longitude == this.lastLng) {
                    console.log('Got new position, but it has not changed.')
                } else {
                    console.log('Got new position!', position);
                    this.api.sendLocation(position.coords.latitude, position.coords.longitude).subscribe(response => {
                        this.lastLat = position.coords.latitude;
                        this.lastLng = position.coords.longitude;
                        if (this.debug) {
                            this.warn('Location response', JSON.stringify(response));
                        }
                    });
                }
            } else {
                console.log('Got empty position.');
            }
        });
    }

    stopTracking() {
        this.storage.set('USE_LOCATION', false).then(result => {
            console.log(result);
            this.watch.unsubscribe();
            console.log('Ended tracking.');
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
