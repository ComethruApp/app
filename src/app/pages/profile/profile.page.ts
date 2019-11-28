import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterOutlet, ActivationStart, ActivatedRoute } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';

import { APIService } from '../../services/api/api.service';
import { User, Event_ } from '../../services/api/models';


@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
    private id: number;
    private user: User;
    private isMe: boolean;
    private events: Event_[];

    constructor(
        private loadingCtrl: LoadingController,
        private alertCtrl: AlertController,
        private router: Router,
        private route: ActivatedRoute,

        private api: APIService,
    ) { }

    async ngOnInit() {
        this.id = parseInt(this.route.snapshot.paramMap.get('id')) || null;
        this.isMe = (!this.id);
        this.getData();
        const loading = await this.loadingCtrl.create({
            message: 'Loading...'
        });
        this.presentLoading(loading);
        this.getData().then(() => loading.dismiss());
    }

    async getData() {
        (this.isMe ? this.api.getMe() : this.api.getUser(this.id)).subscribe((user: User) => {
            this.user = user;
        });

        (this.isMe ? this.api.getMyEvents() : this.api.getUserEvents(this.id)).subscribe((events: Event_[]) => {
            this.events = events;
        });
    }

    doRefresh(event) {
        this.getData().then(() => event.target.complete());
    }

    async presentLoading(loading) {
        return await loading.present();
    }

    friends() {
        this.router.navigate(['/friends']);
    }

    openSettings() {
        this.router.navigate(['/settings']);
    }

    async block() {
        const alert = await this.alertCtrl.create({
            header: 'Confirm',
            message: 'Are you sure you want to block ' + this.user.name + '?',
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
                        this.api.blockUser(this.user.id).subscribe(response => {
                            this.router.navigateByUrl('tabs');
                        });
                    }
                }
            ]
        });
        await alert.present();
    }

}
