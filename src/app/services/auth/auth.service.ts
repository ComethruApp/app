import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

import { Storage } from '@ionic/storage';
import { User } from './user';
import { AuthResponse } from './auth-response';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    AUTH_SERVER_ADDRESS: string = 'http://localhost:5000';
    authSubject = new BehaviorSubject(false);

    constructor(private httpClient: HttpClient, private storage: Storage) { }

    register(user: User): Observable<AuthResponse> {
        return this.httpClient.post<AuthResponse>(`${this.AUTH_SERVER_ADDRESS}/auth/register`, user).pipe(
            tap(async (res: AuthResponse ) => {

                if (res.user) {
                    await this.storage.set("TOKEN", res.user.token);
                    await this.storage.set("EXPIRES_IN", res.user.expires_in);
                    await this.storage.set("USER_ID", res.user.id);
                    this.authSubject.next(true);
                }
            })

        );
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
