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
    @Input() emptyMessage: string;

    constructor(
        private router: Router,
    ) { }

    ngOnInit() {
    }

    goToEvent(eventId) {
        this.router.navigate(['/event/' + eventId]);
    }

    formatDay(date) {
        return moment(date).format('dddd');
    }
    formatDate(date) {
        return moment(date).format('M/D')
    }
    formatTime(date) {
        return moment(date).format('h:mm')
    }
    formatAMPM(date) {
        return moment(date).format('a')
    }
}
