import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
    providedIn: 'root'
})
export class DatesService {

    constructor() { }

    day(date) {
        return moment.utc(date).local().format('dddd');
    }
    date(date) {
        return moment.utc(date).local().format('M/D');
    }
    fullDate(date) {
        return moment.utc(date).local().format('dddd, M/D');
    }
    time(date) {
        return moment.utc(date).local().format('h:mm');
    }
    fullTime(date) {
        return moment.utc(date).local().format('h:mma');
    }
    meridiem(date) {
        return moment.utc(date).local().format('a');
    }
}
