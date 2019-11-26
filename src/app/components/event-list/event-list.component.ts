import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-event-list',
    templateUrl: './event-list.component.html',
    styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {
    @Input() events: Event;
    @Input() emptyMessage: string = "No events";

    constructor(
        private router: Router,
    ) { }

    ngOnInit() {
    }

    goToEvent(eventId) {
        this.router.navigate(['/event/' + eventId]);
    }
}
