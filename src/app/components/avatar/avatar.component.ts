import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../services/api/models';

@Component({
    selector: 'app-avatar',
    templateUrl: './avatar.component.html',
    styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {
    @Input() user: User;
    @Input() large: boolean = false;
    avatar: string;

    constructor() { }

    ngOnInit() {
        if (this.user.facebook_id) {
            this.avatar = 'https://graph.facebook.com/' + this.user.facebook_id + '/picture?type=large'
        } else {
            this.avatar = '/assets/imgs/unknown.png';
        }
    }
}
