import { Component, OnInit } from '@angular/core';
import { APIService } from '../../services/api/api.service';
import { LoadingController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {
  events: Event[];

  constructor(
    public loadingCtrl: LoadingController,
    private apiService: APIService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    if (this.route && this.route.data) {
      this.getData();
    }
  }

  async getData(){
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
    this.presentLoading(loading);

    this.apiService.getEvents().subscribe(events => {
        loading.dismiss();
        this.events = events;
    })
  }

  async presentLoading(loading) {
    return await loading.present();
  }
}
