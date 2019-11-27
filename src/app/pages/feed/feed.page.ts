import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';

import { APIService } from '../../services/api/api.service';
import { Event_ } from '../../services/api/models';

@Component({
    selector: 'app-feed',
    templateUrl: './feed.page.html',
    styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {
    private closed: Event_[];
    private open: Event_[];

    constructor(
        private loadingCtrl: LoadingController,
        private api: APIService,
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
        this.api.getEvents().subscribe(events => {
            this.open = events;
            console.log(this.open);
        });
        this.api.getInvites().subscribe(events => {
            this.closed = events;
        });
    }

    doRefresh(event) {
        this.getData().then(() => event.target.complete());
    }

    async presentLoading(loading) {
        return await loading.present();
    }
}
