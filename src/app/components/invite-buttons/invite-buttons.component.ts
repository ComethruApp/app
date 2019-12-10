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
        this.api.sendInvite(this.eventId, this.user.id).subscribe(response => {
            this.user.invited = true;
        });
    }

    cancelInvite() {
        this.api.cancelInvite(this.eventId, this.user.id).subscribe(response => {
            this.user.invited = false;
        });
    }
}
