import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';

declare var google;

@Component({
    selector: 'app-map',
    templateUrl: './map.page.html',
    styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

    @ViewChild('map') mapElement: ElementRef;
    map: any;
    address :string;

    constructor(
        private geolocation: Geolocation,
        private nativeGeocoder: NativeGeocoder,
    ) { }


    ngOnInit() {
        this.loadMap();
    }

    loadMap() {
        let background = '#263238',
            lightBackground = '#3b464b',
            darkBackground = '#1e282c',
            lighterBackground = '#515a5f',
            accent = '#00356b';
        console.log('Loading');
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
                console.log('accuracy', this.map);
                this.getAddressFromCoords(this.map.center.lat(), this.map.center.lng())
            });

        }).catch((error) => {
            console.log('Error getting location', error);
        });
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
