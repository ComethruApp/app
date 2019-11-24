import { Injectable } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class LoaderService {
    loader: any = null; // TODO: what type?

    constructor(
        private loadingCtrl: LoadingController,
    ) { }

    ngOnInit() {
        this.loader = this.loadingCtrl.create({
            message: 'Loading...'
        });
    }

    async present() {
        return await this.loader.present();
    }

    async dismiss() {
        this.loader.dismiss();
    }
}
