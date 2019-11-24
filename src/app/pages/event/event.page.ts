import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

import { APIService } from '../../services/api/api.service';
import { Event_ } from '../../services/api/models';
import { LoaderService } from '../../services/loader/loader.service';


@Component({
    selector: 'app-event',
    templateUrl: './event.page.html',
    styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {
    private id: number;
    private event: Event_;

    constructor(
        public loadingCtrl: LoadingController,
        private api: APIService,
        private route: ActivatedRoute,
        private router: Router,
    ) { }

    ngOnInit() {
        this.id = parseInt(this.route.snapshot.paramMap.get('id'));
        this.getData();
    }

    async getData(){
        this.presentLoading(loading);

        this.api.getEvent(this.id).subscribe(event => {
            loading.dismiss();
            this.event = event;
        });
    }

    doRefresh(event) {
        this.getData().then(() => event.target.complete());
    }

    formatDay(date) {
        return moment(date).format('dddd');
    }
    formatDate(date) {
        return moment(date).format('h:mma')
    }

    openInvites() {
        this.router.navigate(['/invites/' + this.id]);
    }

    edit() {
        this.router.navigate(['/form-event/' + this.id]);
    }
    async presentLoading(loading) {
        return await loading.present();
    }
}
