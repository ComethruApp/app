import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Storage } from '@ionic/storage';
import { User } from './user';
import { AuthResponse, RegisterResponse } from './auth-response';

import { AlertController } from '@ionic/angular';
import * as Constants from '../../constants';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    ROOT: string = Constants.HOST + '/auth';

    constructor(
        private httpClient: HttpClient,
        private storage: Storage,
        public alertController: AlertController,
    ) { }

    register(user: User): Observable<RegisterResponse> {
        return this.httpClient.post<RegisterResponse>(this.ROOT + '/register', user);
    }

    login(user: User): Observable<AuthResponse> {
        return this.httpClient.post(this.ROOT + '/login', user).pipe(
            tap(async (res: AuthResponse) => {
                if (res.user) {
                    await this.storage.set('TOKEN', res.user.token);
                    await this.storage.set('EXPIRES_IN', res.user.expires_in);
                    await this.storage.set('USER_ID', res.user.id);
                }
            })
        );
    }

    async logout() {
        await this.storage.remove('TOKEN');
        await this.storage.remove('EXPIRES_IN');
    }

    isLoggedIn() {
        // Check if user has logged in.
        // Note that this does not check if the token we have is actually valid.
        return this.storage.get('TOKEN').then(token => {
            return token != null;
        });
    }
}
