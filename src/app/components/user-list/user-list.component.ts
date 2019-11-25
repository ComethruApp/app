import { Component, OnInit, Input } from '@angular/core';
import { APIService } from '../../services/api/api.service';
import { User } from '../../services/api/models';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
    @Input() users: User[];
    @Input() emptyMessage: string;

    constructor(
        private api: APIService,
    ) { }

    // TODO: this indexing method feels really unclean. Works for now, but would be nice to clean it up later.
    requestFriend(i) {
        this.api.requestFriend(this.users[i].id).subscribe(response => {
            this.users[i].has_received_friend_request = true;
        });
    }

    cancelRequest(i) {
        this.api.cancelRequest(this.users[i].id).subscribe(response => {
            this.users[i].has_received_friend_request = false;
        });
    }

    acceptRequest(i) {
        this.api.acceptRequest(this.users[i].id).subscribe(response => {
            this.users[i].has_sent_friend_request = false;
            this.users[i].is_friend = true;
        });
    }
    rejectRequest(i) {
        this.api.rejectRequest(this.users[i].id).subscribe(response => {
            this.users[i].has_sent_friend_request = false;
        });
    }

    unfriend(i) {
        this.api.unfriend(this.users[i].id).subscribe(response => {
            this.users[i].is_friend = false;
        });
    }
}
