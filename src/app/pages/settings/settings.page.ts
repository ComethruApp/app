import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.page.html',
    styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

    constructor(
        private router: Router,
    ) { }

    ngOnInit() {
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
