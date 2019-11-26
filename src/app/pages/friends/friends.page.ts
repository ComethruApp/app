import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIService } from '../../services/api/api.service';
import { User } from '../../services/api/models';

@Component({
    selector: 'app-friends',
    templateUrl: './friends.page.html',
    styleUrls: ['./friends.page.scss'],
})
export class FriendsPage implements OnInit {
    requests: User[] = null;
    friends: User[] = null;

    constructor(
        private router: Router,
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

    searchUsers() {
        this.router.navigate(["/search-users"]);
    }
}