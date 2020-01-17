import { Component, OnInit, Input } from '@angular/core';
import { APIService } from '../../services/api/api.service';
import { User } from '../../services/api/models';

@Component({
    selector: 'app-invite-buttons',
    templateUrl: './invite-buttons.component.html',
    styleUrls: ['./invite-buttons.component.scss']
})
export class InviteButtonsComponent implements OnInit {
    @Input() eventId: number;
    @Input() user: User;

    constructor(
        private api: APIService,
    ) { }

    ngOnInit() {
    }

    sendInvite() {
        this.user.invited = true;
        this.api.sendInvite(this.eventId, this.user.id).subscribe(response => {}, error => {
            this.user.invited = false;
        });
    }

    cancelInvite() {
        this.user.invited = false;
        this.api.cancelInvite(this.eventId, this.user.id).subscribe(response => {}, error => {
            this.user.invited = true;
        });
    }
}
