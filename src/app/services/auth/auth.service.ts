import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

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
    authSubject = new BehaviorSubject(false);

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
                    this.authSubject.next(true);
                }
            })
        );
    }

    async logout() {
        await this.storage.remove('TOKEN');
        await this.storage.remove('EXPIRES_IN');
        this.authSubject.next(false);
    }

    isLoggedIn() {
        // We could probably be checking something more useful than whether the token is null.
        // The main issue I can see with this is that even if the token is invalid it'll still evaluate to true.
        // Maybe we should just assume that an error will be thrown later if the token is invalid to let the user know
        // to log in again?
        // TODO improve this/think it over more
        return this.storage.get('TOKEN').then(token => {
            return token != null;
        });
        //return this.authSubject.asObservable();
    }
}
