import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';

import { APIService } from '../../services/api/api.service';
import { Event_ } from '../../services/api/models';

declare var google;

@Component({
    selector: 'app-map',
    templateUrl: './map.page.html',
    styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

    @ViewChild('map', {static: false}) mapElement: ElementRef;
    map: any;
    address: string;
    loading: any; // TODO: what type?
    events: Event_[];
    meMarker: any = null;
    markers: any = [];

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
        let background = '#15202B',
            darkBackground = '#0e161e',
            lightBackground = '#2c3640',
            lighterBackground = '#434c55',
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

            this.meMarker = new google.maps.Marker({
                position: {
                    lat: resp.coords.latitude,
                    lng: resp.coords.longitude,
                },
                title: 'You',
                id: 0,
                //animation: google.maps.Animation.BOUNCE,
                icon: {
                    url: '/assets/imgs/me_marker.png',
                    scaledSize: new google.maps.Size(27, 43),
                },
            });
            this.meMarker.setMap(this.map);

            this.map.addListener('tilesloaded', () => {
                console.log('Map loaded!');
                this.getAddressFromCoords(this.map.center.lat(), this.map.center.lng())
            });
            this.getData();

        }).catch((error) => {
            console.log('Error getting location', error);
        });
    }

    ionViewWillEnter() {
        this.getData();
    }

    async getData(){
        this.api.getEvents().subscribe(events => {
            this.loading.dismiss();
            this.events = events;
            for (let marker of this.markers) {
                marker.setMap(null);
            }
            this.markers = [];
            for (let event of this.events) {
                let marker = new google.maps.Marker({
                    position: {
                        lat: event.lat,
                        lng: event.lng,
                    },
                    title: event.name,
                    id: event.id,
                    //animation: google.maps.Animation.DROP,
                    icon: {
                        url: '/assets/imgs/marker.png',
                        scaledSize: new google.maps.Size(27, 43),
                    },
                });
                google.maps.event.addListener(marker, 'click', () => {
                    this.router.navigate(['/event/' + event.id]);
                });
                marker.setMap(this.map);
                this.markers.push(marker);
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
        .then((result: NativeGeocoderResult[]) => {
            this.address = "";
            let responseAddress = [];
            for (let [key, value] of Object.entries(result[0])) {
                // TODO: this was breaking after an update, so look into this!
                if (value)
                //if(value.length>0)
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
