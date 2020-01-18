import { Component, OnInit } from '@angular/core';

import { APIService } from '../../services/api/api.service';
import { BrowserService } from '../../services/browser/browser.service';

@Component({
    selector: 'app-help',
    templateUrl: './help.page.html',
    styleUrls: ['./help.page.scss'],
})
export class HelpPage implements OnInit {
    numbers: Object = null;
    objectKeys = Object.keys;

    constructor(
        private api: APIService,
        public browser: BrowserService,
    ) { }

    ngOnInit() {
        this.api.getSafetyNumbers().subscribe(numbers => {
            this.numbers = numbers;
        });
    }
}
