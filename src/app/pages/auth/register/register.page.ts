import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from '../../../services/auth/auth.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { PasswordValidator } from '../../../validators/password.validator';
import { tap } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';

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
    ) { }

    ngOnInit() {
        this.resetFields();
    }

    resetFields(){
        this.validations_form = this.formBuilder.group({
            name: new FormControl('', Validators.required),
            email: new FormControl('', Validators.email),
            password: new FormControl('', Validators.compose([
                Validators.required,
                Validators.minLength(5),
            ])),
            confirm_password: new FormControl('', Validators.required),

        }, (formGroup: FormGroup) => {
             return PasswordValidator.areEqual(formGroup);
        });
    }

    register(form) {
        this.authService.register(form.value).subscribe(response => {
            this.resetFields();
            this.alertController.create({
                header: 'Account created!',
                message: response.message,
                buttons: ['OK'],
            }).then(alert => {
                alert.present();
                this.router.navigateByUrl('login');
            });
        }, response => {
            this.alertController.create({
                header: 'Error',
                message: response.error.message,
                buttons: ['OK'],
            }).then(alert => {
                alert.present();
            });
        });


            /*subscribe((res) => {
        });*/
    }

}
