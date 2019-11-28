import { Component, OnInit, Input } from '@angular/core';
import { APIService } from '../../services/api/api.service';
import { User, Event_ } from '../../services/api/models';

@Component({
    selector: 'app-invite-buttons',
    templateUrl: './invite-buttons.component.html',
    styleUrls: ['./invite-buttons.component.scss']
})
export class InviteButtonsComponent implements OnInit {
    @Input() event: Event_;
    @Input() user: User;
    @Input() invited: boolean;

    constructor(
        private api: APIService,
    ) { }

    ngOnInit() {
    }

    invite() {
        this.api.sendInvite(this.event.id, this.user.id).subscribe(response => {
            this.invited = true;
        });
    }

    disinvite() {
        this.api.rescindInvite(this.event.id, this.user.id).subscribe(response => {
            this.invited = false;
        });
    }
}
