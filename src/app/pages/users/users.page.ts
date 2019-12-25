import { Component, OnInit } from '@angular/core';
import { APIService } from '../../services/api/api.service';
import { User } from '../../services/api/models';

@Component({
    selector: 'app-users',
    templateUrl: './users.page.html',
    styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
    searched: boolean = false;
    searchResults: User[] = null;
    requests: User[] = null;
    friends: User[] = null;
    facebookFriends: User[] = null;

    constructor(
        private api: APIService,
    ) { }

    ngOnInit() {
        this.getData();
    }

    async getData() {
        this.api.getFriendRequests().subscribe(requests => {
            this.requests = requests;
        });
        this.api.getFriends().subscribe(friends => {
            this.friends = friends;
        });
        this.api.getFacebookFriends().subscribe(friends => {
            this.friends = friends;
        });
    }

    async search(query) {
        if (query) {
            this.api.searchUsers(query).subscribe(users => {
                this.searchResults = users;
                this.searched = true;
            });
        } else {
            this.searchResults = [];
            this.searched = false;
        }
    }
}
