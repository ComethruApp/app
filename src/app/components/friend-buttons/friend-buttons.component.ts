import { Component, OnInit, Input } from '@angular/core';
import { APIService } from '../../services/api/api.service';
import { User } from '../../services/api/models';

@Component({
    selector: 'app-friend-buttons',
    templateUrl: './friend-buttons.component.html',
    styleUrls: ['./friend-buttons.component.scss']
})
export class FriendButtonsComponent implements OnInit {
    @Input() user: User;
    @Input() large: boolean = false;
    buttonSize: string;

    constructor(
        private api: APIService,
    ) { }

    ngOnInit() {
        this.buttonSize = this.large ? 'large' : 'default';
    }

    requestFriend() {
        this.api.requestFriend(this.user.id).subscribe(response => {
            this.user.has_received_friend_request = true;
        });
    }

    cancelRequest() {
        this.api.cancelRequest(this.user.id).subscribe(response => {
            this.user.has_received_friend_request = false;
        });
    }

    acceptRequest() {
        this.api.acceptRequest(this.user.id).subscribe(response => {
            this.user.has_sent_friend_request = false;
            this.user.is_friend = true;
        });
    }
    rejectRequest() {
        this.api.rejectRequest(this.user.id).subscribe(response => {
            this.user.has_sent_friend_request = false;
        });
    }

    unfriend() {
        this.api.unfriend(this.user.id).subscribe(response => {
            this.user.is_friend = false;
        });
    }
}
