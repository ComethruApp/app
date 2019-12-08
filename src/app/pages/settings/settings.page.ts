import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Facebook } from '@ionic-native/facebook/ngx';

import { AuthService } from '../../services/auth/auth.service';
import { LocationService } from '../../services/location/location.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.page.html',
    styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

    constructor(
        private router: Router,
		private fb: Facebook,
        private authService: AuthService,
        private locationService: LocationService,
    ) { }

    ngOnInit() {
    }

    facebookLogin() {
        const permissions = ["public_profile", "email", "user_friends"];
        this.fb.login(permissions)
		.then(response =>{
			let userId = response.authResponse.userID;

			// Getting name and gender properties
			this.fb.api("/me?fields=name,email", permissions)
			.then(user =>{
				user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
                console.log({
					name: user.name,
					email: user.email,
					picture: user.picture
				});
			})
		}, error =>{
			console.log(error);
		});
    }

    logout(){
        this.authService.logout()
        .then(res => {
            // TODO: redirect to splash page instead
            this.router.navigate(["/login"]);
        }, err => {
            console.log(err);
        })
    }
}
