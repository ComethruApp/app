import { Component, OnInit, Input } from '@angular/core';
import { APIService } from '../../services/api/api.service';
import { User } from '../../services/api/models';

@Component({
    selector: 'app-host-buttons',
    templateUrl: './host-buttons.component.html',
    styleUrls: ['./host-buttons.component.scss']
})
export class HostButtonsComponent implements OnInit {
    @Input() eventId: number;
    @Input() user: User;

    constructor(
        private api: APIService,
    ) { }

    ngOnInit() {
    }

    add() {
        this.user.hosting = true;
        this.api.addHost(this.eventId, this.user.id).subscribe(response => {}, error => {
            this.user.hosting = false;
        });
    }

    remove() {
        this.user.hosting = false;
        this.api.removeHost(this.eventId, this.user.id).subscribe(response => {}, error => {
            this.user.hosting = true;
        });
    }
}
