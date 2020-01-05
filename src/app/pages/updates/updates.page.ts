import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from '../../services/api/api.service';
import { Update } from '../../services/api/models';

@Component({
    selector: 'app-updates',
    templateUrl: './updates.page.html',
    styleUrls: ['./updates.page.scss'],
})
export class UpdatesPage implements OnInit {
    id: number;
    updates: Update[] = null;

    constructor(
        private route: ActivatedRoute,
        private api: APIService,
    ) { }

    async ngOnInit() {
        this.id = parseInt(this.route.snapshot.paramMap.get('id'));
        this.getData();
    }

    async getData() {
        this.api.getEventUpdates(this.id).subscribe(updates => {
            this.updates = updates;
        });
    }

    doRefresh(event) {
        this.getData().then(() => event.target.complete());
    }
}
