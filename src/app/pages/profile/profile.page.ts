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
    id: number;
    user: User;
    isMe: boolean;
    currentEvent: Event_ = null;
    events: Event_[];

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
        const loading = await this.loadingCtrl.create({
            message: 'Loading...'
        });
        this.presentLoading(loading);
        this.getData().then(() => loading.dismiss());
    }

    async getData() {
        (this.isMe ? this.api.getMe() : this.api.getUser(this.id)).subscribe((user: User) => {
            this.user = user;
            if (this.isMe || user.is_friend) {
                (this.isMe ? this.api.getMyCurrentEvent() : this.api.getUserCurrentEvent(this.id)).subscribe((currentEvent: Event_) => {
                    // TODO: Fix this!!! We should get it as null in the first place!
                    if (currentEvent === null || currentEvent.id === undefined) {
                        currentEvent = null;
                    }
                    this.currentEvent = currentEvent;
                });
            }
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

    openSettings() {
        this.router.navigate(['/settings']);
    }

    help() {
        this.router.navigate(['/help']);
    }

    about() {
        this.router.navigate(['/about']);
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
