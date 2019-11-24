import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from '../../services/api/api.service';
import { User, Event_ } from '../../services/api/models';

@Component({
    selector: 'app-invites',
    templateUrl: './invites.page.html',
    styleUrls: ['./invites.page.scss'],
})
export class InvitesPage implements OnInit {
    private id: number;
    private searchedUsers: User[];
    private invitees: User[];
    private event: Event_ = null;

    constructor(
        public loadingCtrl: LoadingController,
        private apiService: APIService,
        private route: ActivatedRoute,
    ) { }

    ngOnInit() {
        this.id = parseInt(this.route.snapshot.paramMap.get('id'));
        this.getData();
    }

    async getData() {
        const loading = await this.loadingCtrl.create({
            message: 'Loading...'
        });
        this.presentLoading(loading);

        this.apiService.getEventInvitees(this.id).subscribe(invitees => {
            loading.dismiss();
            this.invitees = invitees;
        });
    }

    async searchUsers(query) {
        if (query) {
            this.apiService.searchUsers(query).subscribe(searchedUsers => {
                this.searchedUsers = searchedUsers;
            });
        } else {
            this.searchedUsers = [];
        }
    }

    async sendInvite(userId) {
        this.apiService.requestFriend(userId).subscribe(response => {
            console.log(response);
        });
    }
    async presentLoading(loading) {
        return await loading.present();
    }
}
