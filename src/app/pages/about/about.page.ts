import { Component, OnInit } from '@angular/core';

import { APIService } from '../../services/api/api.service';
import { BrowserService } from '../../services/browser/browser.service';

@Component({
    selector: 'app-about',
    templateUrl: './about.page.html',
    styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
    status: any = null;

    constructor(
        private api: APIService,
        public browser: BrowserService,
    ) { }

    ngOnInit() {
        this.api.getStatus().subscribe(status => {
            this.status = status;
        });
    }
}
