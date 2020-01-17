import { Component, OnInit, Input } from '@angular/core';
import { AlertController } from '@ionic/angular';
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
        private alertCtrl: AlertController,
        private api: APIService,
    ) { }

    ngOnInit() {
        this.buttonSize = this.large ? 'large' : 'default';
    }

    createFriendRequest() {
        this.user.has_received_friend_request = true;
        this.api.createFriendRequest(this.user.id).subscribe(response => {}, error => {
            this.user.has_received_friend_request = false;
        });
    }

    cancelFriendRequest() {
        this.user.has_received_friend_request = false;
        this.api.cancelFriendRequest(this.user.id).subscribe(response => {}, error => {
            this.user.has_received_friend_request = true;
        });
    }

    acceptFriendRequest() {
        this.user.has_sent_friend_request = false;
        this.user.is_friend = true;
        this.api.acceptFriendRequest(this.user.id).subscribe(response => {}, error => {
            this.user.has_sent_friend_request = true;
            this.user.is_friend = false;
        });
    }
    rejectFriendRequest() {
        this.user.has_sent_friend_request = false;
        this.api.rejectFriendRequest(this.user.id).subscribe(response => {}, error => {
            this.user.has_sent_friend_request = true;
        });
    }

    async deleteFriend() {
        const alert = await this.alertCtrl.create({
            header: 'Confirm',
            message: 'Are you sure you want to unfriend ' + this.user.name + '? You\'ll have to request to friend them again.',
            buttons: [
                {
                    text: 'No',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {}
                },
                {
                    text: 'Yes',
                    handler: () => {
                        this.user.is_friend = false;
                        this.api.deleteFriend(this.user.id).subscribe(response => {}, error => {
                            this.user.is_friend = true;
                        });
                    }
                }
            ]
        });
        await alert.present();
    }
}
