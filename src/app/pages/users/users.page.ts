import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInput } from '@ionic/angular';
import { APIService } from '../../services/api/api.service';
import { User } from '../../services/api/models';

@Component({
    selector: 'app-users',
    templateUrl: './users.page.html',
    styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
    @ViewChild(IonInput, {static: false}) searchbar: IonInput;

    // Have they typed anything in search?
    hasTyped: boolean = false;
    // Is what they typed long enough to be searched for?
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

    doRefresh(event) {
        this.getData().then(() => event.target.complete());
    }

    async getData() {
        this.api.getFriendRequests().subscribe(requests => {
            this.requests = requests;
        });
        this.api.getFriends().subscribe(friends => {
            this.friends = friends;
        });
        this.api.getFacebookFriends().subscribe(facebookFriends => {
            this.facebookFriends = facebookFriends;
        });
    }

    async search(query) {
        this.hasTyped = Boolean(query);
        if (this.hasTyped) {
            if (query.length >= 3) {
                this.searchResults = null;
                this.searched = true;
                this.api.searchUsers(query).subscribe(users => {
                    this.searchResults = users;
                    this.searched = true;
                });
            } else {
                this.searchResults = [];
                this.searched = true;
            }
        } else {
            this.searchResults = [];
            this.searched = false;
        }
    }

    clearSearch() {
        this.searchbar.value = '';
        this.hasTyped = false;
        this.searched = false;
        this.searchResults = [];
    }
}
