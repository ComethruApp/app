import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';

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

    formatDay(date) {
        return moment(date).utc().format('dddd');
    }
    formatDate(date) {
        return moment(date).utc().format('dddd MMMM Do, h:mma')
    }
    formatTime(date) {
        return moment(date).utc().format('h:mm')
    }
    formatAMPM(date) {
        return moment(date).utc().format('a')
    }
}
