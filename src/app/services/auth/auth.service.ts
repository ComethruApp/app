import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Storage } from '@ionic/storage';

import * as Constants from '../../constants';
import { AuthResponse, RegisterResponse, ResetPasswordResponse } from './auth-response';
import { OneSignal } from '@ionic-native/onesignal/ngx';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    ROOT: string = Constants.HOST + '/auth';

    constructor(
        private router: Router,
        private http: HttpClient,
        private storage: Storage,
        private oneSignal: OneSignal,
    ) { }

    register(user: Object): Observable<RegisterResponse> {
        return this.http.post<RegisterResponse>(this.ROOT + '/register', user);
    }

    login(user: Object): Observable<AuthResponse> {
        return this.http.post(this.ROOT + '/login', user).pipe(
            tap(async (response: AuthResponse) => {
                if (response.user) {
                    await this.storage.set('TOKEN', response.user.token);
                    this.oneSignal.setExternalUserId(response.user.id.toString());
                }
            })
        );
    }

    async logout() {
        await this.storage.remove('TOKEN');
        // Remove navigation stack so next user to log in won't see this user's views
        this.router.initialNavigation();
        this.router.navigate(['/login']);
    }

    isLoggedIn() {
        // Check if user has logged in.
        // Note that this does not check if the token we have is actually valid.
        return this.storage.get('TOKEN').then(token => {
            return token != null;
        });
    }

    resetPassword(email: string): Observable<ResetPasswordResponse> {
        return this.http.post<ResetPasswordResponse>(this.ROOT + '/reset_password_request', {email: email});
    }
}
