import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { APIService } from '../../services/api/api.service';
import { User } from '../../services/api/models';
import { LoadingController } from '@ionic/angular';
import { Router, RouterOutlet, ActivationStart } from '@angular/router';


@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
    @ViewChild(RouterOutlet) outlet: RouterOutlet;

    private user: User = null;

    constructor(
        public loadingCtrl: LoadingController,
        private apiService: APIService,
        private authService: AuthService,
        private router: Router,
    ) { }

    ngOnInit() {
        this.router.events.subscribe(e => {
            if (e instanceof ActivationStart && e.snapshot.outlet === "profile")
                this.outlet.deactivate();
        });
        this.getData();
    }

    async getData(){
        const loading = await this.loadingCtrl.create({
            message: 'Loading...'
        });
        this.presentLoading(loading);

        // TODO: shouldn't just be me!
        this.apiService.getMe().subscribe((user: User) => {
            loading.dismiss();
            this.user = user;
        });
    }

    async presentLoading(loading) {
        return await loading.present();
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
