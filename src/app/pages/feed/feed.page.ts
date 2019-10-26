import { Component, OnInit } from '@angular/core';
import { APIService } from '../../services/api/api.service';
import { Event_ } from '../../services/api/models';
import { LoadingController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

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

    ngOnInit() {
        this.getData();
    }

    async getData(){
        const loading = await this.loadingCtrl.create({
            message: 'Loading...'
        });
        this.presentLoading(loading);

        this.apiService.getEvents().subscribe(events => {
            loading.dismiss();
            console.log(events);
            this.events = events;
        });
    }

    goToEvent(eventId) {

    }

    async presentLoading(loading) {
        return await loading.present();
    }
}
