import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from '../../../services/auth/auth.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.page.html',
    styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

    validations_form: FormGroup;
    resettingPassword: boolean = false;

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
            email: new FormControl('', Validators.email),
        });
    }

    async submit(form){
        const loading = await this.loadingCtrl.create({
            message: 'Requesting password reset...'
        });
        await loading.present();
        let data = form.value;
        this.authService.resetPassword(data).subscribe(response =>{
            this.resetFields();
            loading.dismiss();
            this.router.navigateByUrl('tabs');
            this.alertController.create({
                header: 'Error',
                message: response.message,
                buttons: ['OK'],
            }).then(alert => {
                alert.present();
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
