import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LoadingController } from '@ionic/angular';
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
    event: Event_;
    friendsHere: User[] = null;

    constructor(
        public loadingCtrl: LoadingController,
        private route: ActivatedRoute,
        private router: Router,

        private api: APIService,
    ) { }

    async ngOnInit() {
        this.id = parseInt(this.route.snapshot.paramMap.get('id'));
        const loading = await this.loadingCtrl.create({
            message: 'Loading...'
        });
        this.presentLoading(loading);
        this.getData().then(() => loading.dismiss());
    }

    async getData() {
        this.api.getEvent(this.id).subscribe(event => {
            this.event = event;
        });
        this.api.getFriendsAtEvent(this.id).subscribe(friendsHere => {
            this.friendsHere = friendsHere;
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

    openInvites() {
        this.router.navigate(['/invites/' + this.id]);
    }

    edit() {
        this.router.navigate(['/form-event/' + this.id]);
    }
    hosts() {
        this.router.navigate(['/hosts/' + this.id]);
    }
    async presentLoading(loading) {
        return await loading.present();
    }
}
