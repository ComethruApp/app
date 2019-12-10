import { Component, OnInit } from '@angular/core';
import { APIService } from '../../services/api/api.service';

@Component({
    selector: 'app-about',
    templateUrl: './about.page.html',
    styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
    status: Object = null;

    constructor(
        private api: APIService,
    ) { }

    ngOnInit() {
        this.api.getStatus().subscribe(status => {
            this.status = status;
        });
    }

}
