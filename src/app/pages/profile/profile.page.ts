import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterOutlet, ActivationStart, ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';

import { APIService } from '../../services/api/api.service';
import { User } from '../../services/api/models';


@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
    private id: number;
    private user: User;
    private isMe: boolean;

    constructor(
        private loadingCtrl: LoadingController,
        private router: Router,
        private route: ActivatedRoute,

        private api: APIService,
    ) { }

    ngOnInit() {
        this.id = parseInt(this.route.snapshot.paramMap.get('id')) || null;
        this.isMe = (!this.id);
        this.getData();
    }

    async getData() {
        const loading = await this.loadingCtrl.create({
            message: 'Loading...'
        });
        this.presentLoading(loading);

        (this.isMe ? this.api.getMe() : this.api.getUser(this.id)).subscribe((user: User) => {
            loading.dismiss();
            this.user = user;
        });
    }

    async presentLoading(loading) {
        return await loading.present();
    }

    searchUsers() {
        this.router.navigate(["/search-users"]);
    }

    friends() {
        this.router.navigate(["/friends"]);
    }

    openSettings() {
        this.router.navigate(["/settings"]);
    }
}
