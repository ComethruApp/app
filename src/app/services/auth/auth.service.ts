import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

import { Storage } from '@ionic/storage';
import { User } from './user';
import { AuthResponse, RegisterResponse } from './auth-response';

import { AlertController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    AUTH_SERVER_ADDRESS: string = 'http://localhost:5000';
    authSubject = new BehaviorSubject(false);

    constructor(
        private httpClient: HttpClient,
        private storage: Storage,
        public alertController: AlertController,
    ) { }

    register(user: User): Observable<RegisterResponse> {
        return this.httpClient.post<RegisterResponse>(`${this.AUTH_SERVER_ADDRESS}/auth/register`, user);
    }

    login(user: User): Observable<AuthResponse> {
        return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/auth/login`, user).pipe(
            tap(async (res: AuthResponse) => {
                if (res.user) {
                    await this.storage.set("TOKEN", res.user.token);
                    await this.storage.set("EXPIRES_IN", res.user.expires_in);
                    await this.storage.set("USER_ID", res.user.id);
                    this.authSubject.next(true);
                }
            })
        );
    }

    async logout() {
        await this.storage.remove("TOKEN");
        await this.storage.remove("EXPIRES_IN");
        this.authSubject.next(false);
    }

    isLoggedIn() {
        return this.authSubject.asObservable();
    }
}
