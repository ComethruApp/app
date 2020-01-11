import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DatesService {

  constructor() { }

    hour(date) {
        return moment.utc(date).local().format('h:mma')
    }
    date(date) {
        return moment.utc(date).local().format('dddd, M/D');
    }
}
