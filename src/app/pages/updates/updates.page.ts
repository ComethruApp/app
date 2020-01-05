import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from '../../services/api/api.service';
import { Update, Event_ } from '../../services/api/models';

@Component({
    selector: 'app-updates',
    templateUrl: './updates.page.html',
    styleUrls: ['./updates.page.scss'],
})
export class UpdatesPage implements OnInit {
    eventId: number;
    event: Event = null;
    updates: Update[] = null;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private api: APIService,
    ) { }

    async ngOnInit() {
        this.eventId = parseInt(this.route.snapshot.paramMap.get('eventId'));
        this.getData();
    }

    async getData() {
        this.api.getEvent(this.eventId).subscribe(event => {
            this.event = event;
        });
        this.api.getUpdates(this.eventId).subscribe(updates => {
            this.updates = updates;
        });
    }

    doRefresh(event) {
        this.getData().then(() => event.target.complete());
    }

    openFormUpdate() {
        this.router.navigate(['/event/' + this.eventId + '/form-update']);
    }
}
