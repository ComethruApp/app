import { Injectable } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Injectable({
    providedIn: 'root'
})
export class BrowserService {

    constructor(
        private iab: InAppBrowser,
    ) { }

    open(page) {
        this.iab.create(page, '_system').show();
    }
}
