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
        this.router.events.subscribe(e => {
            if (e instanceof ActivationStart && e.snapshot.outlet === "form-events")
                this.outlet.deactivate();
        });
        this.resetFields();
    }

    resetFields(){
        this.validations_form = this.formBuilder.group({
            title: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required),
            location: new FormControl('', Validators.required),
            open: new FormControl(true),
            time_start: new FormControl(),
            time_end: new FormControl(),
        });
    }

    submit(form) {
        // TODO: also support update!
        this.apiService.createEvent(form.value).subscribe((res)=>{
            this.router.navigateByUrl('tabs');
        });
    }
}
