import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Facebook } from '@ionic-native/facebook/ngx';

import { AuthService } from '../../services/auth/auth.service';
import { APIService } from '../../services/api/api.service';
import { User } from '../../services/api/models';
import { LocationService } from '../../services/location/location.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.page.html',
    styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
    user: User = null;

    constructor(
        private router: Router,
		private fb: Facebook,
        private authService: AuthService,
        private api: APIService,
        private locationService: LocationService,
    ) { }

    ngOnInit() {
        this.getData();
    }

    getData() {
        this.api.getMe().subscribe(user => {
            this.user = user;
        });
    }

    facebookConnect() {
        const permissions = [
            'public_profile',
            'email',
            //'user_friends',
        ];
        this.fb.login(permissions)
		.then(response => {
			let userId = response.authResponse.userID;

			// Get name from API
			this.fb.api('/me?fields=name', permissions)
			.then(user => {
                this.api.facebookConnect(userId, user.name).subscribe(response => {
                    this.getData();
                });
			});
		}, error =>{
			console.log(error);
		});
    }

    facebookDisconnect() {
        this.fb.logout()
		.then(response => {
            this.api.facebookDisconnect().subscribe(response => {
                this.getData();
            });
		}, error =>{
			console.log(error);
		});
    }

    logout(){
        this.authService.logout()
        .then(res => {
            this.router.navigate(['/login']);
        }, err => {
            console.log(err);
        })
    }
}
