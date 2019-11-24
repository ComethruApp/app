import { Injectable } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class LoaderService {
    constructor(
        private loadingCtrl: LoadingController,
    ) { }

    async getLoader() {
        return await this.loadingCtrl.create({
            message: 'Loading...'
        });
    }

    async present(loader) {
        console.log(loader);
        return await loader.present();
    }

    async dismiss(loader) {
    }
}
