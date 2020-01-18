import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { APIService } from '../../services/api/api.service';
import { Event_, User, Update } from '../../services/api/models';
import { DatesService } from '../../services/dates/dates.service';

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

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private iab: InAppBrowser,

        private api: APIService,
        public dates: DatesService,
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
        /*
        this.api.getUpdates(this.id).subscribe(updates => {
            this.updates = updates;
        });
        */
    }

    doRefresh(event) {
        this.getData().then(() => event.target.complete());
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

    openVenmo(name) {
        this.iab.create('https://venmo.com/' + name, '_system').show();
    }

    edit() {
        this.router.navigate(['/form-event/' + this.id]);
    }
}
