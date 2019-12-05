import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as Constants from '../../constants';
import 'rxjs/add/observable/throw';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Storage } from '@ionic/storage';

import { User, Event_, Vote } from './models';

import { AuthService } from '../auth/auth.service';
import { from } from 'rxjs';
import 'rxjs/add/operator/mergeMap'

@Injectable({
    providedIn: 'root'
})
export class APIService {
    ROOT: string = Constants.HOST + '/api';

    constructor(
        private httpClient: HttpClient,
        private storage: Storage,
    ) { }

    private ops(token: string): Object {
        return {
            params: new HttpParams().set('token', token),
        };
    }

    private get(path: string): Observable<any> {
        let storageObservable = from(this.storage.get('TOKEN'));

        return storageObservable.mergeMap(token => {
            return this.httpClient.get(this.ROOT + path, this.ops(token));
        });
    }

    private post(path: string, data: any): Observable<any> {
        let storageObservable = from(this.storage.get('TOKEN'));

        return storageObservable.mergeMap(token => {
            return this.httpClient.post(this.ROOT + path, data, this.ops(token));
        });
    }

    private delete(path: string): Observable<any> {
        let storageObservable = from(this.storage.get('TOKEN'));

        return storageObservable.mergeMap(token => {
            return this.httpClient.delete(this.ROOT + path, this.ops(token));
        });
    }

    private put(path: string, data: any): Observable<any> {
        let storageObservable = from(this.storage.get('TOKEN'));

        return storageObservable.mergeMap(token => {
            return this.httpClient.put(this.ROOT + path, data, this.ops(token));
        });
    }

    public heartbeat(): Observable<Object> {
        return this.get('/heartbeat')
        .map(response => {
            return response;
        })
        .catch((err) => {
            return Observable.throw(err.statusText);
        });
    }

    public sendLocation(lat: number, lng: number): Observable<Object> {
        return this.post('/location', {lat: lat, lng: lng})
        .map(response => {
            return response;
        })
        .catch((err) => {
            return Observable.throw(err.statusText);
        });
    }

    public getUser(userId: number): Observable<User> {
        return this.get('/users/' + userId)
        .map(response => {
            return new User(response);
        })
        .catch((err) => {
            return Observable.throw(err.statusText);
        });
    }

    // TODO: consider combining with getUser and using the /users/me endpoint when userId is null
    public getMe(): Observable<User> {
        return this.get('/users/me')
        .map(response => {
            return new User(response);
        })
        .catch((err) => {
            return Observable.throw(err.statusText);
        });
    }

    public searchUsers(query: string): Observable<User[]> {
        return this.get('/users/search/' + query)
        .map(response => {
            return response.map((user) => new User(user));
        })
        .catch((err) => {
            return Observable.throw(err.statusText);
        });
    }

    // TODO this function should be merged with something else if possible... feels like a hack
    public searchUsersForEvent(eventId: number, query: string): Observable<User[]> {
        return this.get('/events/' + eventId + '/invites/search/' + query)
        .map(response => {
            return response.map((user) => new User(user));
        })
        .catch((err) => {
            return Observable.throw(err.statusText);
        });
    }

    public updateUser(user: User){

    }

    public blockUser(userId: number): Observable<Object> {
        return this.post('/users/' + userId + '/block', {})
        .map(response => {
            return response;
        })
        .catch((err) => {
            return Observable.throw(err.statusText);
        });
    }

    public getMyCurrentEvent(): Observable<Event_> {
        return this.get('/users/me/events/current')
        .map(response => {
            return new Event_(response);
        })
        .catch((err) => {
            return Observable.throw(err.statusText);
        });
    }

    public getUserCurrentEvent(userId: number): Observable<Event_> {
        return this.get('/users/' + userId + '/events/current')
        .map(response => {
            return new Event_(response);
        })
        .catch((err) => {
            return Observable.throw(err.statusText);
        });
    }

    public getMyEvents(): Observable<Event_[]> {
        return this.get('/users/me/events')
        .map(response => {
            return response.map((event) => new Event_(event));
        })
        .catch((err) => {
            return Observable.throw(err.statusText);
        });
    }

    public getUserEvents(userId: number): Observable<Event_[]> {
        return this.get('/users/' + userId + '/events')
        .map(response => {
            return response.map((event) => new Event_(event));
        })
        .catch((err) => {
            return Observable.throw(err.statusText);
        });
    }

    public getFriendsAtEvent(eventId: number): Observable<User[]> {
        return this.get('/events/' + eventId + '/friends')
        .map(response => {
            return response.map((event) => new User(event));
        })
        .catch((err) => {
            return Observable.throw(err.statusText);
        });
    }

    public getEvents(): Observable<Event_[]> {
        return this.get('/events')
        .map(response => {
            return response.map((event) => new Event_(event));
        })
        .catch((err) => {
            return Observable.throw(err.statusText);
        });
    }

    public getInvites(): Observable<Event_[]> {
        return this.get('/users/me/invites')
        .map(response => {
            return response.map((event) => new Event_(event));
        })
        .catch((err) => {
            return Observable.throw(err.statusText);
        });
    }

    public getEvent(eventId: number): Observable<Event_> {
        return this.get('/events/' + eventId)
        .map(response => {
            return new Event_(response);
        })
        .catch((err) => {
            return Observable.throw(err.statusText);
        });
    }

    public createEvent(event: Event_): Observable<Event_> {
        return this.post('/events', event)
        .map(response => {
            return new Event_(response);
        })
        .catch((err) => {
            return Observable.throw(err.statusText);
        });
    }

    public updateEvent(eventId: number, event: Event_): Observable<Event_> {
        return this.put('/events/' + eventId, event)
        .map(response => {
            return new Event_(response);
        })
        .catch((err) => {
            return Observable.throw(err.statusText);
        });
    }

    public deleteEvent(eventId: number): Observable<Object> {
        return this.delete('/events/' + eventId)
        .map(response => {
            return response;
        })
        .catch((err) => {
            return Observable.throw(err.statusText);
        });
    }

    public endEvent(eventId: number): Observable<Object> {
        return this.post('/events/' + eventId + '/end', {})
        .map(response => {
            return response;
        })
        .catch((err) => {
            return Observable.throw(err.statusText);
        });
    }

    public getEventInvitees(eventId: number): Observable<User[]> {
        return this.get('/events/' + eventId + '/invites')
        .map(response => {
            return response.map((user) => new User(user));
        })
        .catch((err) => {
            return Observable.throw(err.statusText);
        });
    }

    public sendInvite(eventId: number, userId: number): Observable<Object> {
        return this.post('/events/' + eventId + '/invites/' + userId, {})
        .map(response => {
            return response;
        })
        .catch((err) => {
            return Observable.throw(err.statusText);
        });
    }

    public rescindInvite(eventId: number, userId: number): Observable<Object> {
        return this.delete('/events/' + eventId + '/invites/' + userId)
        .map(response => {
            return response;
        })
        .catch((err) => {
            return Observable.throw(err.statusText);
        });
    }

    public vote(eventId: number, positive: boolean, negative: boolean, review: string): Observable<Object> {
        return this.post('/events/' + eventId + '/vote', {positive: positive, negative: negative, review: review})
        .map(response => {
            return response;
        })
        .catch((err) => {
            return Observable.throw(err.statusText);
        });
    }

    public unvote(eventId: number): Observable<Object> {
        return this.delete('/events/' + eventId + '/vote')
        .map(response => {
            return response;
        })
        .catch((err) => {
            return Observable.throw(err.statusText);
        });
    }

    public updateLocation(loc) {
        this.post('/location', loc)
        .map(response => {
            return response;
        })
        .catch((err) => {
            return Observable.throw(err.statusText);
        });
    }

    public requestFriend(userId: number): Observable<Object> {
        return this.post('/friends/request/' + userId, {})
        .map(response => {
            return response;
        })
        .catch((err) => {
            return Observable.throw(err.statusText);
        });
    }

    public cancelRequest(userId: number): Observable<Object> {
        return this.post('/friends/cancel/' + userId, {})
        .map(response => {
            return response;
        })
        .catch((err) => {
            return Observable.throw(err.statusText);
        });
    }

    public acceptRequest(userId: number): Observable<Object> {
        return this.post('/friends/accept/' + userId, {})
        .map(response => {
            return response;
        })
        .catch((err) => {
            return Observable.throw(err.statusText);
        });
    }

    public rejectRequest(userId: number): Observable<Object> {
        return this.post('/friends/reject/' + userId, {})
        .map(response => {
            return response;
        })
        .catch((err) => {
            return Observable.throw(err.statusText);
        });
    }

    public unfriend(userId: number): Observable<Object> {
        return this.post('/friends/remove/' + userId, {})
        .map(response => {
            return response;
        })
        .catch((err) => {
            return Observable.throw(err.statusText);
        });
    }

    public getFriendRequests(): Observable<User[]> {
        return this.get('/friends/requests')
        .map(response => {
            return response.map((user) => new User(user));
        })
        .catch((err) => {
            return Observable.throw(err.statusText);
        });
    }

    public getFriends(): Observable<User[]> {
        return this.get('/friends')
        .map(response => {
            return response.map((user) => new User(user));
        })
        .catch((err) => {
            return Observable.throw(err.statusText);
        });
    }
}
