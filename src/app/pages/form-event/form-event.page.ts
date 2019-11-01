import { Component, OnInit, ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { Router, RouterOutlet, ActivationStart } from "@angular/router";
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { APIService } from '../../services/api/api.service';

@Component({
    selector: 'app-form-event',
    templateUrl: './form-event.page.html',
    styleUrls: ['./form-event.page.scss'],
})
export class FormEventPage implements OnInit {
    @ViewChild(RouterOutlet) outlet: RouterOutlet;

    validations_form: FormGroup;

    constructor(
        private apiService: APIService,
        private geolocation: Geolocation,
        private nativeGeocoder: NativeGeocoder,
        private router: Router,
        private formBuilder: FormBuilder,
    ) { }

    ngOnInit() {
        this.resetFields();
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

    submit(form) {
        // TODO: also support update!
        let data = form.value;
        this.geolocation.getCurrentPosition().then((resp) => {
            data.lat = resp.coords.latitude;
            data.lng = resp.coords.longitude;
            this.apiService.createEvent(data).subscribe((res)=>{
                this.resetFields();
                this.router.navigateByUrl('tabs');
            });
        });
    }
}
