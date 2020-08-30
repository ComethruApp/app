import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
    providedIn: 'root'
})
export class DatesService {

    constructor() { }

    /* Convert from raw ISO-formatted UTC date into a date in local time that can be formatted. */
    private process(date, format) {
        if (date == undefined) return null;
        return moment.utc(date).local().format(format);
    }

    iso(date) {
        return this.process(date, '');
    }
    day(date) {
        return this.process(date, 'dddd');
    }
    date(date) {
        return this.process(date, 'M/D');
    }
    fullDate(date) {
        return this.process(date, 'dddd, M/D');
    }
    time(date) {
        return this.process(date, 'h:mm');
    }
    fullTime(date) {
        return this.process(date, 'h:mma');
    }
    meridiem(date) {
        return this.process(date, 'a');
    }

}
