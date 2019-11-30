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
    id: number;
    searchedUsers: User[] = null;
    hasSearched: boolean = false;
    invitees: User[] = null;
    event: Event_ = null;

    constructor(
        public loadingCtrl: LoadingController,
        private api: APIService,
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

        this.api.getEventInvitees(this.id).subscribe(invitees => {
            loading.dismiss();
            this.invitees = invitees;
        });
    }

    async searchUsers(query) {
        if (query) {
            this.api.searchUsersForEvent(this.id, query).subscribe(searchedUsers => {
                this.hasSearched = true;
                this.searchedUsers = searchedUsers;
            });
        } else {
            this.hasSearched = false;
            this.searchedUsers = [];
        }
    }

    async sendInvite(userId) {
        this.api.sendInvite(this.id, userId).subscribe(response => {
            console.log(response);
        });
    }

    async rescindInvite(userId) {
        this.api.rescindInvite(this.id, userId).subscribe(response => {
            console.log(response);
        });
    }

    async presentLoading(loading) {
        return await loading.present();
    }
}
