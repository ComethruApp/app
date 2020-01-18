import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

import { AuthService } from '../../../services/auth/auth.service';
import { BrowserService } from '../../../services/browser/browser.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

    validations_form: FormGroup;

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private alertController: AlertController,
        private loadingCtrl: LoadingController,

        private authService: AuthService,
        public browser: BrowserService,
    ) { }

    ngOnInit() {
        this.resetFields();
    }

    resetFields(){
        this.validations_form = this.formBuilder.group({
            name: new FormControl('', Validators.required),
            email: new FormControl('', Validators.email),
            year: new FormControl(),
            password: new FormControl('', Validators.compose([
                Validators.required,
                Validators.minLength(5),
            ])),
        });
    }

    async register(form) {
        const loading = await this.loadingCtrl.create({
            message: 'Registering...'
        });
        await loading.present();
        this.authService.register(form.value).subscribe(response => {
            this.resetFields();
            loading.dismiss();

            this.alertController.create({
                header: 'Account created!',
                message: response.message,
                buttons: ['OK'],
            }).then(alert => {
                alert.present();
                this.router.navigateByUrl('login');
            });
        }, response => {
            loading.dismiss();
            this.alertController.create({
                header: 'Error',
                message: response.error.message,
                buttons: ['OK'],
            }).then(alert => {
                alert.present();
            });
        });
    }
}
