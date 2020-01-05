import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router, RouterOutlet, ActivationStart, ActivatedRoute } from '@angular/router';

import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { APIService } from '../../services/api/api.service';
import { Update } from '../../services/api/models';

@Component({
    selector: 'app-form-update',
    templateUrl: './form-update.page.html',
    styleUrls: ['./form-update.page.scss'],
})
export class FormUpdatePage implements OnInit {
    @ViewChild(RouterOutlet, {static: false}) outlet: RouterOutlet;

    validations_form: FormGroup;
    editing: boolean = false;
    eventId: number;
    id: number;
    update: Update = null;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder,
        private loadingCtrl: LoadingController,

        private api: APIService,
    ) { }

    async ngOnInit() {
        this.eventId = parseInt(this.route.snapshot.paramMap.get('id'));
        this.id = parseInt(this.route.snapshot.paramMap.get('id')) || null;
        if (this.id) {
            this.editing = true;
            this.getData();
        }
        this.resetFields();
    }

    async getData(){
        this.api.getUpdate(this.eventId, this.id).subscribe(update => {
            this.update = update;
        });
    }

    resetFields(){
        this.validations_form = this.formBuilder.group({
            body: new FormControl('', Validators.required),
        });
    }

    async submit(form) {
        let data = form.value;
        const loading = await this.loadingCtrl.create({
            message: (this.editing ? 'Updating' : 'Posting') + '...'
        });
        await loading.present();
        (this.editing ? this.api.updateUpdate(this.eventId, this.id, data)
                      : this.api.createUpdate(this.eventId, data)).subscribe(newUpdate => {
            loading.dismiss();
            this.router.navigate(['event/' + this.eventId]);
            this.resetFields();
        });
    }
}
