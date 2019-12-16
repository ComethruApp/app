import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from '../../../services/auth/auth.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { PasswordValidator } from '../../../validators/password.validator';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

    validations_form: FormGroup;

    constructor(
        private authService: AuthService,
        private router: Router,
        private formBuilder: FormBuilder,
        public alertController: AlertController,
        public loadingCtrl: LoadingController,
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
            confirm_password: new FormControl('', Validators.required),
        }, (formGroup: FormGroup) => {
             return PasswordValidator.areEqual(formGroup);
        });
    }

    async register(form) {
        const loading = await this.loadingCtrl.create({
            message: 'Registering...'
        });
        this.presentLoading(loading);
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

    async presentLoading(loading) {
        return await loading.present();
    }
}
