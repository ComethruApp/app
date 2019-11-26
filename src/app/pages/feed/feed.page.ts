import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import * as moment from 'moment';

import { APIService } from '../../services/api/api.service';
import { Event_ } from '../../services/api/models';

@Component({
    selector: 'app-feed',
    templateUrl: './feed.page.html',
    styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {
    events: Event_[];

    constructor(
        public loadingCtrl: LoadingController,
        private apiService: APIService,
        private router: Router,
        private route: ActivatedRoute,
    ) { }

    async ngOnInit() {
        const loading = await this.loadingCtrl.create({
            message: 'Loading...'
        });
        this.presentLoading(loading);
        this.getData().then(() => loading.dismiss());
    }

    async getData() {
        this.apiService.getEvents().subscribe(events => {
            this.events = events;
        });
    }

    doRefresh(event) {
        this.getData().then(() => event.target.complete());
    }

    formatDay(date) {
        return moment(date).format('dddd');
    }
    formatDate(date) {
        return moment(date).format('dddd MMMM Do, h:mma')
    }
    formatTime(date) {
        return moment(date).format('h:mm')
    }
    formatAMPM(date) {
        return moment(date).format('a')
    }

    async presentLoading(loading) {
        return await loading.present();
    }
}
