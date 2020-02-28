import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Geolocation } from '@ionic-native/geolocation/ngx';

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
    events: Event_[] = null;
    meMarker: any = null;
    markers: any = [];
    mapLoaded: boolean = false;
    markersLoaded: boolean = false;
    // Keep track of whether we've loaded the map once, so that we don't fetch twice the first
    // time we load.
    loadedOnce: boolean = false;

    constructor(
        private router: Router,
        private geolocation: Geolocation,
        private api: APIService,
    ) { }

    async ngOnInit() {
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

            this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
            console.log('Initialized map.');

            this.meMarker = new google.maps.Marker({
                position: {
                    lat: resp.coords.latitude,
                    lng: resp.coords.longitude,
                },
                title: 'You',
                id: 0,
                //animation: google.maps.Animation.BOUNCE,
                icon: {
                    url: '/assets/imgs/markers/me.png',
                    scaledSize: new google.maps.Size(27, 43),
                },
            });
            this.meMarker.setMap(this.map);
            console.log('Added self marker.');

            this.mapLoaded = true;
            this.map.addListener('tilesloaded', () => {
                console.log('Map loaded!');
            });
            this.getData();

        }).catch((error) => {
            console.log('Error getting location', error);
        });
    }

    ionViewWillExit() {
        this.loadedOnce = true;
    }

    ionViewWillEnter() {
        if (this.loadedOnce) {
            this.getData();
        }
    }

    async getData(){
        this.api.getEvents().subscribe(events => {
            this.events = events;
            let newMarkers = [];
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
                        url: '/assets/imgs/markers/event_' + Math.floor(event.people / event.capacity * 5) + '.png',
                        scaledSize: new google.maps.Size(27, 43),
                    },
                });
                google.maps.event.addListener(marker, 'click', () => {
                    this.router.navigate(['/event/' + event.id]);
                });
                marker.setMap(this.map);
                newMarkers.push(marker);
            }
            this.markersLoaded = true;
            console.log('Markers have been loaded!');
            // Wait to remove markers until the new ones are visible, to avoid flash
            setTimeout(() => {
                for (let marker of this.markers) {
                    marker.setMap(null);
                }
                this.markers = newMarkers;
            }, 200);
        });
    }
}
