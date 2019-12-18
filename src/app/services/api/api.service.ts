import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

import { from } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/catch'

import { AuthService } from '../auth/auth.service';
import * as Constants from '../../constants';
import { User, Event_, Vote } from './models';

@Injectable({
    providedIn: 'root'
})
export class APIService {
    ROOT: string = Constants.HOST + '/api';

    constructor(
        private httpClient: HttpClient,
        private storage: Storage,
        private router: Router,
        private authService: AuthService,
    ) { }

    private ops(token: string): Object {
        return {
            params: new HttpParams().set('token', token),
        };
    }

    private req(f): Observable<any> {
        let storageObservable = from(this.storage.get('TOKEN'));

        return storageObservable.mergeMap(f)
        .catch(error => {
            if (error.status == 401) {
                // We were denied due to lack of authentication, so log out.
                this.authService.logout()
                .then(res => {
                    this.router.navigate(['/login']);
                }, error => {
                    console.log(error);
                });
            }
            return Observable.throw(error);
        });
    }
    private get(path: string): Observable<any> {
        return this.req(token => this.httpClient.get(this.ROOT + path, this.ops(token)));
    }
    private post(path: string, data: any): Observable<any> {
        return this.req(token => this.httpClient.post(this.ROOT + path, data, this.ops(token)));
    }
    private delete(path: string): Observable<any> {
        return this.req(token => this.httpClient.delete(this.ROOT + path, this.ops(token)));
    }
    private put(path: string, data: any): Observable<any> {
        return this.req(token => this.httpClient.put(this.ROOT + path, data, this.ops(token)));
    }


    // Miscellaneous
    heartbeat(): Observable<Object> {
        return this.get('/heartbeat');
    }

    sendLocation(lat: number, lng: number): Observable<Object> {
        return this.post('/location', {lat: lat, lng: lng});
    }


    // Users
    getUser(userId: number): Observable<User> {
        return this.get('/users/' + userId)
        .map(response => new User(response));
    }

    getMe(): Observable<User> {
        return this.get('/users/me')
        .map(response => new User(response));
    }

    updateUser(user: User){

    }

    searchUsers(query: string): Observable<User[]> {
        return this.get('/users/search/' + query)
        .map(response => response.map((user) => new User(user)));
    }

    // TODO this function should be merged with something else if possible... feels like a hack
    searchUsersForEvent(eventId: number, query: string): Observable<User[]> {
        return this.get('/events/' + eventId + '/invites/search/' + query)
        .map(response => response.map((user) => new User(user)));
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

    getFriendRequests(): Observable<User[]> {
        return this.get('/friends/requests')
        .map(response => response.map((user) => new User(user)));
    }

    // Used by request's sender
    createFriendRequest(userId: number): Observable<Object> { return this.post('/friends/' + userId + '/request', {}); }
    cancelFriendRequest(userId: number): Observable<Object> { return this.post('/friends/' + userId + '/cancel', {}); }
    // Used by request's receiver
    acceptFriendRequest(userId: number): Observable<Object> { return this.post('/friends/' + userId + '/accept', {}); }
    rejectFriendRequest(userId: number): Observable<Object> { return this.post('/friends/' + userId + '/reject', {}); }

    getFriends(): Observable<User[]> {
        return this.get('/friends')
        .map(response => response.map((user) => new User(user)));
    }

    deleteFriend(userId: number): Observable<Object> {
        return this.post('/friends/remove/' + userId, {});
    }


    // Events
    getEvents(): Observable<Event_[]> {
        return this.get('/events')
        .map(response => response.map((event) => new Event_(event)));
    }

    getEvent(eventId: number): Observable<Event_> {
        return this.get('/events/' + eventId)
        .map(response => new Event_(response));
    }

    createEvent(event: Event_): Observable<Event_> {
        return this.post('/events', event)
        .map(response => new Event_(response));
    }

    updateEvent(eventId: number, event: Event_): Observable<Event_> {
        return this.put('/events/' + eventId, event)
        .map(response => new Event_(response));
    }

    deleteEvent(eventId: number): Observable<Object> {
        return this.delete('/events/' + eventId);
    }

    endEvent(eventId: number): Observable<Object> {
        return this.post('/events/' + eventId + '/end', {});
    }

    getUserEvents(userId: number): Observable<Event_[]> {
        return this.get('/users/' + userId + '/events')
        .map(response => response.map((event) => new Event_(event)));
    }
    getMyEvents(): Observable<Event_[]> {
        return this.get('/users/me/events')
        .map(response => response.map((event) => new Event_(event)));
    }

    getEventFriends(eventId: number): Observable<User[]> {
        return this.get('/events/' + eventId + '/friends')
        .map(response => response.map((event) => new User(event)));
    }

    getUserCurrentEvent(userId: number): Observable<Event_> {
        return this.get('/users/' + userId + '/events/current')
        .map(response => new Event_(response));
    }
    getMyCurrentEvent(): Observable<Event_> {
        return this.get('/users/me/events/current')
        .map(response => new Event_(response));
    }

    getEventInvites(eventId: number): Observable<User[]> {
        return this.get('/events/' + eventId + '/invites')
        .map(response => response.map((user) => new User(user)));
    }

    sendInvite(eventId: number, userId: number): Observable<Object> {
        return this.post('/events/' + eventId + '/invites/' + userId, {});
    }

    cancelInvite(eventId: number, userId: number): Observable<Object> {
        return this.delete('/events/' + eventId + '/invites/' + userId);
    }

    getEventHosts(eventId: number): Observable<User[]> {
        return this.get('/events/' + eventId + '/hosts')
        .map(response => response.map((user) => new User(user)));
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
        .map(response => response.map((vote) => new Vote(vote)));
    }
}
