import { Component, OnInit } from '@angular/core';
import { APIService } from '../../services/api/api.service';
import { User } from '../../services/api/models';

@Component({
    selector: 'app-search-users',
    templateUrl: './search-users.page.html',
    styleUrls: ['./search-users.page.scss'],
})
export class SearchUsersPage implements OnInit {
    searched: boolean = false;
    searchResults: User[] = null;
    requests: User[] = null;
    friends: User[] = null;

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
