import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
    providedIn: 'root'
})
export class DatesService {

    constructor() { }

    /* Convert from raw ISO-formatted UTC date into a date in local time that can be formatted. */
    private process(date) {
        return moment.utc(date).local();
    }

    iso(date) {
        return this.process(date).format();
    }
    day(date) {
        return this.process(date).format('dddd');
    }
    date(date) {
        return this.process(date).format('M/D');
    }
    fullDate(date) {
        return this.process(date).format('dddd, M/D');
    }
    time(date) {
        return this.process(date).format('h:mm');
    }
    fullTime(date) {
        return this.process(date).format('h:mma');
    }
    meridiem(date) {
        return this.process(date).format('a');
    }

}
