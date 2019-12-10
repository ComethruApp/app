import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { APIService } from '../../services/api/api.service';
import { Event_ } from '../../services/api/models';

@Component({
    selector: 'app-feed',
    templateUrl: './feed.page.html',
    styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {
    events: Event_[] = null;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private api: APIService,
    ) { }

    async ngOnInit() {
        this.getData();
    }

    async getData() {
        this.api.getEvents().subscribe(events => {
            this.events = events;
        });
    }

    doRefresh(event) {
        this.getData().then(() => event.target.complete());
    }
}
