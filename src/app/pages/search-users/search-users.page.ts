import { Component, OnInit } from '@angular/core';
import { APIService } from '../../services/api/api.service';
import { User } from '../../services/api/models';

@Component({
    selector: 'app-search-users',
    templateUrl: './search-users.page.html',
    styleUrls: ['./search-users.page.scss'],
})
export class SearchUsersPage implements OnInit {
    users: User[];

    constructor(
        private api: APIService,
    ) { }

    ngOnInit() {
    }

    async getData(query) {
        if (query) {
            this.api.searchUsers(query).subscribe(users => {
                this.users = users;
            });
        } else {
            this.users = [];
        }
    }

    async requestFriend(userId) {
        this.api.requestFriend(userId).subscribe(response => {
            console.log(response);
        });
    }
}
