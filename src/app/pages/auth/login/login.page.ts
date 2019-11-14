import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from '../../../services/auth/auth.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

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
            email: new FormControl('', Validators.email),
            password: new FormControl('', Validators.required),
        });
    }

    async login(form){
        const loading = await this.loadingCtrl.create({
            message: 'Logging in...'
        });
        this.presentLoading(loading);
        let data = form.value;
        this.authService.login(data).subscribe(response =>{
            this.resetFields();
            loading.dismiss();
            this.router.navigateByUrl('tabs');
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
