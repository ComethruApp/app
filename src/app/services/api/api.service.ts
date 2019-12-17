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
        })
        .catch((err) => {
            return Observable.throw(err.statusText);
        });
    }

    private delete(path: string): Observable<any> {
        let storageObservable = from(this.storage.get('TOKEN'));

        return storageObservable.mergeMap(token => {
            return this.httpClient.delete(this.ROOT + path, this.ops(token));
        })
        .catch((err) => {
            return Observable.throw(err.statusText);
        });
    }

    private put(path: string, data: any): Observable<any> {
        let storageObservable = from(this.storage.get('TOKEN'));

        return storageObservable.mergeMap(token => {
            return this.httpClient.put(this.ROOT + path, data, this.ops(token));
        })
        .catch((err) => {
            return Observable.throw(err.statusText);
        });
    }

    heartbeat(): Observable<Object> {
        return this.get('/heartbeat');
    }

    getStatus(): Observable<Object> {
        return this.get('/status');
    }

    sendLocation(lat: number, lng: number): Observable<Object> {
        return this.post('/location', {lat: lat, lng: lng});
    }

    getUser(userId: number): Observable<User> {
        return this.get('/users/' + userId)
        .map(response => {
            return new User(response);
        });
    }

    // TODO: consider combining with getUser and using the /users/me endpoint when userId is null
    getMe(): Observable<User> {
        return this.get('/users/me')
        .map(response => {
            return new User(response);
        });
    }

    searchUsers(query: string): Observable<User[]> {
        return this.get('/users/search/' + query)
        .map(response => {
            return response.map((user) => new User(user));
        });
    }

    // TODO this function should be merged with something else if possible... feels like a hack
    searchUsersForEvent(eventId: number, query: string): Observable<User[]> {
        return this.get('/events/' + eventId + '/invites/search/' + query)
        .map(response => {
            return response.map((user) => new User(user));
        });
    }

    updateUser(user: User){

    }

    blockUser(userId: number): Observable<Object> {
        return this.post('/users/' + userId + '/block', {});
    }

    facebookConnect(id: string, name: string): Observable<Object> {
        return this.post('/users/me/facebook', {id: id, name: name});
    }

    facebookDisconnect(): Observable<Object> {
        return this.delete('/users/me/facebook');
    }

    getMyCurrentEvent(): Observable<Event_> {
        return this.get('/users/me/events/current')
        .map(response => {
            return new Event_(response);
        });
    }

    getUserCurrentEvent(userId: number): Observable<Event_> {
        return this.get('/users/' + userId + '/events/current')
        .map(response => {
            return new Event_(response);
        });
    }

    getMyEvents(): Observable<Event_[]> {
        return this.get('/users/me/events')
        .map(response => {
            return response.map((event) => new Event_(event));
        });
    }

    getUserEvents(userId: number): Observable<Event_[]> {
        return this.get('/users/' + userId + '/events')
        .map(response => {
            return response.map((event) => new Event_(event));
        });
    }

    getFriendsAtEvent(eventId: number): Observable<User[]> {
        return this.get('/events/' + eventId + '/friends')
        .map(response => {
            return response.map((event) => new User(event));
        });
    }

    getEvents(): Observable<Event_[]> {
        return this.get('/events')
        .map(response => {
            return response.map((event) => new Event_(event));
        });
    }

    getInvites(): Observable<Event_[]> {
        return this.get('/users/me/invites')
        .map(response => {
            return response.map((event) => new Event_(event));
        });
    }

    getEvent(eventId: number): Observable<Event_> {
        return this.get('/events/' + eventId)
        .map(response => {
            return new Event_(response);
        });
    }

    createEvent(event: Event_): Observable<Event_> {
        return this.post('/events', event)
        .map(response => {
            return new Event_(response);
        });
    }

    updateEvent(eventId: number, event: Event_): Observable<Event_> {
        return this.put('/events/' + eventId, event)
        .map(response => {
            return new Event_(response);
        });
    }

    deleteEvent(eventId: number): Observable<Object> {
        return this.delete('/events/' + eventId);
    }

    endEvent(eventId: number): Observable<Object> {
        return this.post('/events/' + eventId + '/end', {});
    }

    getEventInvites(eventId: number): Observable<User[]> {
        return this.get('/events/' + eventId + '/invites')
        .map(response => {
            return response.map((user) => new User(user));
        });
    }

    sendInvite(eventId: number, userId: number): Observable<Object> {
        return this.post('/events/' + eventId + '/invites/' + userId, {});
    }

    cancelInvite(eventId: number, userId: number): Observable<Object> {
        return this.delete('/events/' + eventId + '/invites/' + userId);
    }

    getEventHosts(eventId: number): Observable<User[]> {
        return this.get('/events/' + eventId + '/hosts')
        .map(response => {
            return response.map((user) => new User(user));
        });
    }

    addHost(eventId: number, userId: number): Observable<Object> {
        return this.post('/events/' + eventId + '/hosts/' + userId, {});
    }

    removeHost(eventId: number, userId: number): Observable<Object> {
        return this.delete('/events/' + eventId + '/hosts/' + userId);
    }

    vote(eventId: number, positive: boolean, negative: boolean, review: string): Observable<Object> {
        return this.post('/events/' + eventId + '/vote', {positive: positive, negative: negative, review: review});
    }

    unvote(eventId: number): Observable<Object> {
        return this.delete('/events/' + eventId + '/vote');
    }

    getEventVotes(eventId: number): Observable<Vote[]> {
        return this.get('/events/' + eventId + '/votes')
        .map(response => {
            return response.map((vote) => new Vote(vote));
        });
    }

    updateLocation(loc: Object) {
        this.post('/location', loc);
    }

    requestFriend(userId: number): Observable<Object> {
        return this.post('/friends/request/' + userId, {});
    }

    cancelRequest(userId: number): Observable<Object> {
        return this.post('/friends/cancel/' + userId, {});
    }

    acceptRequest(userId: number): Observable<Object> {
        return this.post('/friends/accept/' + userId, {});
    }

    rejectRequest(userId: number): Observable<Object> {
        return this.post('/friends/reject/' + userId, {});
    }

    unfriend(userId: number): Observable<Object> {
        return this.post('/friends/remove/' + userId, {});
    }

    getFriendRequests(): Observable<User[]> {
        return this.get('/friends/requests')
        .map(response => {
            return response.map((user) => new User(user));
        });
    }

    getFriends(): Observable<User[]> {
        return this.get('/friends')
        .map(response => {
            return response.map((user) => new User(user));
        });
    }
}
