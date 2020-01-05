import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from '../../services/api/api.service';
import { Update, Event_ } from '../../services/api/models';

@Component({
    selector: 'app-update',
    templateUrl: './update.page.html',
    styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {
    eventId: number;
    event: Event_ = null;
    id: number;
    update: Update = null;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private api: APIService,
    ) { }

    async ngOnInit() {
        this.eventId = parseInt(this.route.snapshot.paramMap.get('eventId'));
        this.id = parseInt(this.route.snapshot.paramMap.get('id'));
        this.getData();
    }

    async getData() {
        this.api.getEvent(this.eventId).subscribe(event => {
            this.event = event;
        });
        this.api.getUpdate(this.eventId, this.id).subscribe(update => {
            this.update = update;
        });
    }

    doRefresh(event) {
        this.getData().then(() => event.target.complete());
    }

    openUser(userId: number) {
        this.router.navigate(['/user/' + userId]);
    }

    openFormUpdate() {
        this.router.navigate(['/event/' + this.eventId + '/form-update/' + this.id]);
    }
}
