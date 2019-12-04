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
        console.log(query);
        if (query) {
            console.log('It do');
            this.api.searchUsers(query).subscribe(users => {
                this.searchResults = users;
                this.searched = true;
            });
        } else {
            console.log('It don\'t');
            this.searchResults = [];
            this.searched = false;
        }
        console.log(this.searched);
    }
}
