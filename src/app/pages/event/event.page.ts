import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

import { APIService } from '../../services/api/api.service';
import { Event_, User, Update } from '../../services/api/models';

@Component({
    selector: 'app-event',
    templateUrl: './event.page.html',
    styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {
    id: number;
    event: Event_ = null;
    friends: User[] = null;
    updates: Update[] = null;
    hasYCC: boolean = false;
    hasAlcohol: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,

        private api: APIService,
    ) { }

    async ngOnInit() {
        this.id = parseInt(this.route.snapshot.paramMap.get('id'));
        this.getData();
    }

    async getData() {
        this.api.getEvent(this.id).subscribe(event => {
            this.event = event;
            if (event.tags.indexOf('ycc') !== -1) {
                this.hasYCC = true;
            }
            if (event.tags.indexOf('alcohol') !== -1) {
                this.hasAlcohol = true;
            }
        });
        this.api.getEventFriends(this.id).subscribe(friends => {
            this.friends = friends;
        });
        /*
        this.api.getUpdates(this.id).subscribe(updates => {
            this.updates = updates;
        });
        */
    }

    doRefresh(event) {
        this.getData().then(() => event.target.complete());
    }

    formatTime(date) {
        return moment.utc(date).local().format('h:mma')
    }
    formatDate(date) {
        return moment.utc(date).local().format('dddd, M/D');
    }

    openUser(userId: number) {
        this.router.navigate(['/user/' + userId]);
    }

    openUpdates() {
        this.router.navigate(['/event/' + this.id + '/updates']);
    }
    openUpdate(updateId: number) {
        this.router.navigate(['/event/' + this.id + '/updates/' + updateId]);
    }

    openInvites() {
        this.router.navigate(['/invites/' + this.id]);
    }

    openReviews() {
        this.router.navigate(['/reviews/' + this.id]);
    }

    edit() {
        this.router.navigate(['/form-event/' + this.id]);
    }
}
