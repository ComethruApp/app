import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

import { APIService } from '../../services/api/api.service';
import { User, Event_ } from '../../services/api/models';

@Component({
    selector: 'app-ticket',
    templateUrl: './ticket.page.html',
    styleUrls: ['./ticket.page.scss'],
})
export class TicketPage implements OnInit {
    id: number;
    event: Event_ = null;
    user: User = null;
    code: string;

    constructor(
        public loadingCtrl: LoadingController,
        private route: ActivatedRoute,

        private api: APIService,
    ) { }

    async ngOnInit() {
        this.id = parseInt(this.route.snapshot.paramMap.get('id'));
        const loading = await this.loadingCtrl.create({
            message: 'Loading...'
        });
        this.presentLoading(loading);
        this.getData().then(() => {
            // TODO: this is a trashy hashing algorithm and not remotely secure
            // Need to think about better options for this.
            loading.dismiss()
        });
    }

    hex(num): string {
        return ((num << 1) ^ 0x2af).toString(16).toUpperCase().padStart(3, '0').slice(-3);
    }

    async getData() {
        this.api.getEvent(this.id).subscribe(event => {
            this.event = event;
        });
        this.api.getMe().subscribe(user => {
            this.user = user;
            this.code = this.hex(this.id) + '-' + this.hex(this.user.id);
        });
    }

    formatDay(date) {
        return moment(date).utc().format('dddd');
    }
    formatDate(date) {
        return moment(date).utc().format('h:mma')
    }

    async presentLoading(loading) {
        return await loading.present();
    }
}
