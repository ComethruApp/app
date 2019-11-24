import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterOutlet, ActivationStart } from '@angular/router';

import { AuthService } from '../../services/auth/auth.service';
import { APIService } from '../../services/api/api.service';
import { User } from '../../services/api/models';


@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
    private user: User;

    constructor(
        public loadingCtrl: LoadingController,
        private api: APIService,
        private authService: AuthService,
        private router: Router,
    ) { }

    ngOnInit() {
        this.getData();
    }

    async getData(){
        const loading = await this.loadingCtrl.create({
            message: 'Loading...'
        });
        this.presentLoading(loading);

        // TODO: shouldn't just be me!
        this.api.getMe().subscribe((user: User) => {
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

    friendRequests() {
        this.router.navigate(["/friend-requests"]);
    }

    openSettings() {
        this.router.navigate(["/settings"]);
    }
}
