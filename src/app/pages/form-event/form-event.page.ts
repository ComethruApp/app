import { Component, OnInit, ViewChild } from '@angular/core';
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
            location_name: new FormControl('', Validators.required),
            open: new FormControl(true),
            time_start: new FormControl(),
            time_end: new FormControl(),
            venmo: new FormControl(''),
        });
    }

    submit(form) {
        // TODO: also support update!
        let data = form.value;
        data.location_lat = 41.3163 + (Math.random() * 0.0001 - 0.00005);
        data.location_lon = -72.9223 + (Math.random() * 0.0001 - 0.00005);
        this.apiService.createEvent(data).subscribe((res)=>{
            this.resetFields();
            this.router.navigateByUrl('tabs');
        });
    }
}
