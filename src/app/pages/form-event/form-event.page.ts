import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router, RouterOutlet, ActivationStart, ActivatedRoute } from '@angular/router';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

// For image upload
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/Camera/ngx';
import { File, FileEntry } from '@ionic-native/File/ngx';
import { HttpClient } from '@angular/common/http';
import { WebView } from '@ionic-native/ionic-webview/ngx';

import { APIService } from '../../services/api/api.service';
import { Event_ } from '../../services/api/models';
import { DatesService } from '../../services/dates/dates.service';

@Component({
    selector: 'app-form-event',
    templateUrl: './form-event.page.html',
    styleUrls: ['./form-event.page.scss'],
})
export class FormEventPage implements OnInit {
    @ViewChild(RouterOutlet, {static: false}) outlet: RouterOutlet;

    validations_form: FormGroup;
    editing: boolean = false;
    id: number;
    event: Event_ = null;
    showTransitiveInvites: boolean = false;
    lat: number;
    lng: number;
    address: string;
    facebookEvents: Object[] = null;
    hasImage: boolean = false;
    image: string = null;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder,
        private alertCtrl: AlertController,
        private loadingCtrl: LoadingController,

        private geolocation: Geolocation,
        private nativeGeocoder: NativeGeocoder,

        private camera: Camera,
        private file: File,

        private api: APIService,
        public dates: DatesService,
    ) { }

    async ngOnInit() {
        this.id = parseInt(this.route.snapshot.paramMap.get('id')) || null;
        if (this.id) {
            this.editing = true;
            this.getData();
        } else {
            this.getAddress();
        }
        this.resetFields();
    }

    cleanAddress(value: string, punctuation: string) {
        if (value) {
            return value + punctuation;
        } else {
            return '';
        }
    }

    async getAddress() {
        this.geolocation.getCurrentPosition().then((resp) => {
            this.lat = resp.coords.latitude;
            this.lng = resp.coords.longitude;
            let options: NativeGeocoderOptions = {
                useLocale: true,
                maxResults: 1,
            };

            this.nativeGeocoder.reverseGeocode(resp.coords.latitude, resp.coords.longitude, options)
            .then(async (results: NativeGeocoderResult[]) => {
                if (results && results.length != 0) {
                    let result = results[0];
                    this.address = this.cleanAddress(result.subThoroughfare, ' ') +
                                   this.cleanAddress(result.thoroughfare, ', ') +
                                   this.cleanAddress(result.locality, ', ') +
                                   this.cleanAddress(result.subAdministrativeArea, ', ') +
                                   this.cleanAddress(result.administrativeArea, '');
                }
            })
            .catch((error: any) => console.log(error));
        });
    }

    async getData(){
        this.api.getEvent(this.id).subscribe(event => {
            this.event = event;
            this.changePrivacy(this.event.open);
            this.hasImage = true;
            this.image = event.image;
        });
    }

    resetFields(){
        this.validations_form = this.formBuilder.group({
            name: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required),
            alcohol: new FormControl(false),
            location: new FormControl('', Validators.required),
            address: new FormControl(''),
            time: new FormControl('', Validators.required),
            end_time: new FormControl(''),
            open: new FormControl(true),
            transitive_invites: new FormControl(false),
            capacity: new FormControl(0, Validators.required),
            venmo: new FormControl(''),
        });
    }

    changePrivacy(open: boolean) {
        this.showTransitiveInvites = !open;
    }

    async delete() {
        const alert = await this.alertCtrl.create({
            header: 'Confirm',
            message: 'Do you want to delete ' + this.event.name + '?',
            buttons: [
                {
                    text: 'No',
                    role: 'cancel',
                    handler: () => {}
                },
                {
                    text: 'Yes',
                    handler: () => {
                        this.api.deleteEvent(this.id).subscribe(response => {
                            this.router.navigateByUrl('tabs');
                        });
                    }
                }
            ]
        });
        await alert.present();
    }

    async end() {
        const alert = await this.alertCtrl.create({
            header: 'Really end?',
            message: 'Are you sure you want to end ' + this.event.name + '? This can\'t be undone.',
            buttons: [
                {
                    text: 'No',
                    role: 'cancel',
                    handler: () => {}
                },
                {
                    text: 'Yes',
                    handler: () => {
                        this.api.endEvent(this.id).subscribe(response => {
                            this.router.navigateByUrl('tabs');
                        });
                    }
                }
            ]
        });
        await alert.present();
    }

    async upload(data) {
        const loading = await this.loadingCtrl.create({
            message: (this.editing ? 'Updating' : 'Posting') + '...'
        });
        await loading.present();
        (this.editing ? this.api.updateEvent(this.id, data) : this.api.createEvent(data)).subscribe((newEvent)=>{
            loading.dismiss();
            this.router.navigate(['event/' + newEvent.id]);
            this.resetFields();
        });
    }


    async submit(form) {
        let data = form.value;
        // Only give warning if the event is being created now
        if (this.editing) {
            this.upload(data);
        } else {
            data.image = this.image;
            data.lat = this.lat;
            data.lng = this.lng;
            const alert = await this.alertCtrl.create({
                header: 'Are you sure?',
                message: data.name + ' will go live at your location.',
                buttons: [
                    {
                        text: 'Lemme check again',
                        role: 'cancel',
                        handler: () => {},
                    },
                    {
                        text: 'Full send',
                        handler: () => {
                            this.upload(data);
                        },
                    }
                ]
            });
            await alert.present();
        }
    }

    hosts() {
        this.router.navigate(['/hosts/' + this.id]);
    }

    tags() {
        this.router.navigate(['/tags/' + this.id]);
    }

    addImage() {
        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        }

        this.camera.getPicture(options).then(imageRaw => {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64 (DATA_URL):
            this.api.uploadImage(imageRaw).subscribe(imageData => {
                this.image = imageData['url'];
            });
        }, (err) => {
            // Handle error
        });
    }

    removeImage() {
        this.image = null;
    }
}
