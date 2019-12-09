import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from '../../services/api/api.service';
import { User, Event_ } from '../../services/api/models';

@Component({
    selector: 'app-hosts',
    templateUrl: './hosts.page.html',
    styleUrls: ['./hosts.page.scss'],
})
export class HostsPage implements OnInit {
    id: number;
    searchedUsers: User[] = null;
    hasSearched: boolean = false;
    hosts: User[] = null;
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

        this.api.getEventHosts(this.id).subscribe(hosts => {
            loading.dismiss();
            this.hosts = hosts;
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

    async addHost(userId) {
        this.api.addHost(this.id, userId).subscribe(response => {
            console.log(response);
        });
    }

    async removeHost(userId) {
        this.api.removeHost(this.id, userId).subscribe(response => {
            console.log(response);
        });
    }

    async presentLoading(loading) {
        return await loading.present();
    }
}
