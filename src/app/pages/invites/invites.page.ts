import { Component, OnInit } from '@angular/core';
import { APIService } from '../../services/api/api.service';
import { User, Event_ } from '../../services/api/models';

@Component({
    selector: 'app-invites',
    templateUrl: './invites.page.html',
    styleUrls: ['./invites.page.scss'],
})
export class InvitesPage implements OnInit {
    private id: number;
    searchedUsers: User[];
    invites: User[];
    private event: Event_ = null;

    constructor(
        private apiService: APIService,
    ) { }

    ngOnInit() {
    }

    async getData() {

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

    async requestFriend(userId) {
        this.apiService.requestFriend(userId).subscribe(response => {
            console.log(response);
        });
    }
}
