import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { Router, RouterOutlet, ActivationStart, ActivatedRoute } from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { APIService } from '../../services/api/api.service';
import { Event_ } from '../../services/api/models';

@Component({
    selector: 'app-form-event',
    templateUrl: './form-event.page.html',
    styleUrls: ['./form-event.page.scss'],
})
export class FormEventPage implements OnInit {
    @ViewChild(RouterOutlet) outlet: RouterOutlet;

    validations_form: FormGroup;
    private editing: boolean = false;
    private id: number;
    private event: Event_ = null;


    constructor(
        private apiService: APIService,
        private geolocation: Geolocation,
        private nativeGeocoder: NativeGeocoder,
        private route: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder,
        private alertCtrl: AlertController,
        private loadingCtrl: LoadingController,
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

        this.apiService.getEvent(this.id).subscribe(event => {
            loading.dismiss();
            this.event = event;
        });
    }

    resetFields(){
        this.validations_form = this.formBuilder.group({
            name: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required),
            location: new FormControl('', Validators.required),
            open: new FormControl(true),
            time: new FormControl(),
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
                        this.apiService.deleteEvent(this.id).subscribe(response => {
                            this.router.navigateByUrl('tabs');
                        });
                    }
                }
            ]
        });
        await alert.present();
    }

    submit(form) {
        // TODO: also support update!
        let data = form.value;
        this.geolocation.getCurrentPosition().then((resp) => {
            data.lat = resp.coords.latitude;
            data.lng = resp.coords.longitude;
            (this.editing ? this.apiService.updateEvent : this.apiService.createEvent)(data).subscribe((res)=>{
                this.resetFields();
                this.router.back();
            });
        });
    }

    async presentLoading(loading) {
        return await loading.present();
    }
}
