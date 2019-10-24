import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
//import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';


@Component({
    selector: 'app-new-event',
    templateUrl: './new-event.page.html',
    styleUrls: ['./new-event.page.scss'],
})
export class NewEventPage implements OnInit {

    validations_form: FormGroup;

    constructor(
        public toastCtrl: ToastController,
        public loadingCtrl: LoadingController,
        public router: Router,
        private formBuilder: FormBuilder,
        private firebaseService: FirebaseService,
        private webview: WebView
    ) { }

    ngOnInit() {
        this.resetFields();
    }

    resetFields(){
        this.validations_form = this.formBuilder.group({
            title: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required),
            location: new FormControl('', Validators.required),
            open: new FormControl(true),
        });
    }

    onSubmit(value){
        console.log(value);
        let data = {
            title: value.title,
            description: value.description,
            location: value.location,
            open: value.open,
        }
        this.firebaseService.createEvent(data).then(
            res => {
                this.router.navigate(["/tabs"]);
            }
        )
    }

    async presentLoading(loading) {
        return await loading.present();
    }
}
