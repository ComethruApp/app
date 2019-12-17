import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router, RouterOutlet, ActivationStart, ActivatedRoute } from '@angular/router';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { APIService } from '../../services/api/api.service';
import { Event_ } from '../../services/api/models';

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
    lat: number;
    lng: number;
    address: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder,
        private alertCtrl: AlertController,
        private loadingCtrl: LoadingController,

        private geolocation: Geolocation,
        private nativeGeocoder: NativeGeocoder,

        private api: APIService,
    ) { }

    async ngOnInit() {
        this.id = parseInt(this.route.snapshot.paramMap.get('id')) || null;
        if (this.id) {
            this.editing = true;
            this.getData();
        }
        this.resetFields();
        this.getAddress();
    }

    async getAddress() {
        this.geolocation.getCurrentPosition().then((resp) => {
            this.lat = resp.coords.latitude;
            this.lng = resp.coords.longitude;
            let options: NativeGeocoderOptions = {
                useLocale: true,
                maxResults: 5,
            };

            this.nativeGeocoder.reverseGeocode(resp.coords.latitude, resp.coords.longitude, options)
            .then(async (result: NativeGeocoderResult[]) => {
                this.address = JSON.stringify(result);
            })
            .catch((error: any) => console.log(error));
        });
    }

    async getData(){
        this.api.getEvent(this.id).subscribe(event => {
            this.event = event;
        });
    }

    resetFields(){
        this.validations_form = this.formBuilder.group({
            name: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required),
            location: new FormControl('', Validators.required),
            //address: new FormControl('', Validators.required),
            time: new FormControl('', Validators.required),
            end_time: new FormControl(''),
            open: new FormControl(true),
            transitive_invites: new FormControl(false),
            capacity: new FormControl(0, Validators.required),
        });
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

    async submit(form) {
        const alert = await this.alertCtrl.create({
            header: 'Does this look right?',
            message: '',
            buttons: [
                {
                    text: 'No',
                    role: 'cancel',
                    handler: () => {}
                },
                {
                    text: 'Full send',
                    handler: async () => {
                        let data = form.value;
                        data.lat = this.lat;
                        data.lng = this.lng;
                        data.address = this.address;
                        const loading = await this.loadingCtrl.create({
                            message: (this.editing ? 'Updating' : 'Posting') + '...'
                        });
                        this.presentLoading(loading);
                        (this.editing ? this.api.updateEvent(this.id, data) : this.api.createEvent(data)).subscribe((newEvent)=>{
                            loading.dismiss();
                            this.router.navigate(['event/' + newEvent.id]);
                            this.resetFields();
                        });
                    }
                }
            ]
        });
        await alert.present();
    }

    hosts() {
        this.router.navigate(['/hosts/' + this.id]);
    }

    async presentLoading(loading) {
        return await loading.present();
    }
}
