import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

import { APIService } from '../../services/api/api.service';
import { User, Event_ } from '../../services/api/models';

@Component({
    selector: 'app-event',
    templateUrl: './event.page.html',
    styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {
    id: number;
    event: Event_ = null;
    friends: User[] = null;
    hasYCC: boolean = false;

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
        });
        this.api.getEventFriends(this.id).subscribe(friends => {
            this.friends = friends;
        });
    }

    doRefresh(event) {
        this.getData().then(() => event.target.complete());
    }

    formatTime(date) {
        return moment(date).format('h:mma')
    }
    formatDate(date) {
        return moment(date).format('dddd, M/D');
    }

    openUser(userId: number) {
        this.router.navigate(['/user/' + userId]);
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
