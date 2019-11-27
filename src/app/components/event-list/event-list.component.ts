import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Event_ } from '../../services/api/models';

@Component({
    selector: 'app-event-list',
    templateUrl: './event-list.component.html',
    styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {
    @Input() events: Event_[];
    @Input() emptyMessage: string = "No events.";

    constructor(
        private router: Router,
    ) { }

    ngOnInit() { }

    goToEvent(eventId) {
        this.router.navigate(['/event/' + eventId]);
    }
}
