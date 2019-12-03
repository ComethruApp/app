import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router, RouterOutlet, ActivationStart, ActivatedRoute } from '@angular/router';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
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

    ngOnInit() {
        this.id = parseInt(this.route.snapshot.paramMap.get('id')) || null;
        if (this.id) {
            this.editing = true;
            this.getData();
        }
        this.resetFields();
    }

    async getData(){
        const loading = await this.loadingCtrl.create({
            message: 'Loading...'
        });
        this.presentLoading(loading);

        this.api.getEvent(this.id).subscribe(event => {
            loading.dismiss();
            this.event = event;
        });
    }

    resetFields(){
        this.validations_form = this.formBuilder.group({
            name: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required),
            location: new FormControl('', Validators.required),
            time: new FormControl('', Validators.required),
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
                    cssClass: 'secondary',
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
                    cssClass: 'secondary',
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
        const loading = await this.loadingCtrl.create({
            message: 'Loading...'
        });
        this.presentLoading(loading);
        let data = form.value;
        this.geolocation.getCurrentPosition().then((resp) => {
            data.lat = resp.coords.latitude;
            data.lng = resp.coords.longitude;
            (this.editing ? this.api.updateEvent(this.id, data) : this.api.createEvent(data)).subscribe((newEvent)=>{
                loading.dismiss();
                this.resetFields();
                this.router.navigate(['event/' + newEvent.id]);
            });
        });
    }

    async presentLoading(loading) {
        return await loading.present();
    }
}
