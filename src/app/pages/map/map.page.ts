import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';

import { APIService } from '../../services/api/api.service';
import { Event_ } from '../../services/api/models';

declare var google;

@Component({
    selector: 'app-map',
    templateUrl: './map.page.html',
    styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

    @ViewChild('map') mapElement: ElementRef;
    map: any;
    address: string;
    loading: any; // TODO: what type?
    events: Event_[];

    constructor(
        private router: Router,
        private geolocation: Geolocation,
        private nativeGeocoder: NativeGeocoder,
        private loadingCtrl: LoadingController,
        private api: APIService,
    ) { }


    async ngOnInit() {
        this.loading = await this.loadingCtrl.create({
            message: 'Loading...'
        });
        this.presentLoading(this.loading);
        this.loadMap();
    }

    loadMap() {
        let background = '#263238',
            lightBackground = '#3b464b',
            darkBackground = '#1e282c',
            lighterBackground = '#515a5f',
            accent = '#00356b';
        this.geolocation.getCurrentPosition().then((resp) => {
            let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
            let mapOptions = {
                center: latLng,
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                mapTypeControl: false,
                zoomControl: false,
                streetViewControl: false,
                rotateControl: false,
                fullscreenControl: false,
                backgroundColor: background,
                styles: [
                    {
                        featureType: 'water',
                        elementType: 'geometry',
                        stylers: [{
                            color: darkBackground
                        }]
                    },
                    {
                        featureType: 'landscape',
                        elementType: 'geometry',
                        stylers: [{
                            color: lightBackground
                        }]
                    },
                    {
                        featureType: 'road',
                        elementType: 'geometry',
                        stylers: [
                            {
                                color: lightBackground
                            },
                            {
                                lightness: -37
                            }
                        ]
                    },
                    {
                        featureType: 'poi',
                        elementType: 'geometry',
                        stylers: [{
                            color: lighterBackground
                        }]
                    },
                    {
                        elementType: 'labels.text.stroke',
                        stylers: [
                            {
                                visibility: 'on'
                            },
                            {
                                color: lighterBackground
                            },
                            {
                                weight: 2
                            },
                            {
                                gamma: 0.84
                            }
                        ]
                    },
                    {
                        elementType: 'labels.text.fill',
                        stylers: [{
                            color: '#ffffff'
                        }]
                    },
                    {
                        featureType: 'administrative',
                        elementType: 'geometry',
                        stylers: [
                            {
                                weight: 0.6
                            },
                            {
                                color: accent
                            }
                        ]
                    },
                    {
                        elementType: 'labels.icon',
                        stylers: [{
                            visibility: 'off'
                        }]
                    },
                    {
                        featureType: 'poi.park',
                        elementType: 'geometry',
                        stylers: [{
                            color: background
                        }]
                    }
                ]
            }

            this.getAddressFromCoords(resp.coords.latitude, resp.coords.longitude);

            this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

            this.map.addListener('tilesloaded', () => {
                console.log('Map loaded!');
                this.getAddressFromCoords(this.map.center.lat(), this.map.center.lng())
            });
            this.getData();

        }).catch((error) => {
            console.log('Error getting location', error);
        });
    }

    async getData(){
        this.api.getEvents().subscribe(events => {
            this.loading.dismiss();
            this.events = events;
            for (let event of this.events) {
                let marker = new google.maps.Marker({
                    position: {
                        lat: event.lat,
                        lng: event.lng,
                    },
                    title: event.name,
                    id: event.id,
                });
                google.maps.event.addListener(marker, 'click', () => {
                    this.router.navigate(['/event/' + event.id]);
                });
                marker.setMap(this.map);
            }
        });
    }

    async presentLoading(loading) {
        return await loading.present();
    }

    getAddressFromCoords(latitude, longitude) {
        console.log("getAddressFromCoords "+latitude+" "+longitude);
        let options: NativeGeocoderOptions = {
            useLocale: true,
            maxResults: 5
        };

        this.nativeGeocoder.reverseGeocode(latitude, longitude, options)
        .then((result: NativeGeocoderReverseResult[]) => {
            this.address = "";
            let responseAddress = [];
            for (let [key, value] of Object.entries(result[0])) {
                if(value.length>0)
                    responseAddress.push(value);

            }
            responseAddress.reverse();
            for (let value of responseAddress) {
                this.address += value+", ";
            }
            this.address = this.address.slice(0, -2);
        })
        .catch((error: any) =>{
            this.address = "Address Not Available!";
        });

    }
}
