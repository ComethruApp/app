import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Event_ } from '../../services/api/models';
import { APIService } from '../../services/api/api.service';

@Component({
    selector: 'app-event',
    templateUrl: './event.page.html',
    styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {
    private id: number;
    private event: Event_;

    constructor(
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        private apiService: APIService,
        private route: ActivatedRoute,
        private router: Router,
    ) { }

    ngOnInit() {
        this.id = parseInt(this.route.snapshot.paramMap.get('id'));
        this.getData();
    }

    async getData(){
        const loading = await this.loadingCtrl.create({
            message: 'Loading...'
        });
        this.presentLoading(loading);

        this.apiService.getEvent(this.id).subscribe(event => {
            loading.dismiss();
            this.event = event;
            console.log(event);
        });
    }

    async delete() {
        const alert = await this.alertCtrl.create({
            header: 'Confirm',
            message: 'Do you want to delete ' + this.event.name + '?',
            buttons: [
                {
                    text: 'No',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {}
                },
                {
                    text: 'Yes',
                    handler: () => {
                        // TODO
                    }
                }
            ]
        });
        await alert.present();
    }

    async presentLoading(loading) {
        return await loading.present();
    }
}
