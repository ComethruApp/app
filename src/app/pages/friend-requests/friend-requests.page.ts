import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIService } from '../../services/api/api.service';
import { User } from '../../services/api/models';

@Component({
    selector: 'app-friend-requests',
    templateUrl: './friend-requests.page.html',
    styleUrls: ['./friend-requests.page.scss'],
})
export class FriendRequestsPage implements OnInit {
    requests: User[] = null;
    friends: User[] = null;

    constructor(
        private router: Router,
        private apiService: APIService,
    ) { }

    ngOnInit() {
        this.getData();
    }

    async getData() {
        this.apiService.getFriendRequests().subscribe(requests => {
            this.requests = requests;
        });
        this.apiService.getFriends().subscribe(friends => {
            this.friends = friends;
        });
    }

    searchUsers() {
        this.router.navigate(["/search-users"]);
    }

    acceptRequests() {
    }

    rejectRequests() {
    }

    unfriend() {
    }
}
