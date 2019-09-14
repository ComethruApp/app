import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
    providedIn: 'root'
})
export class FirebaseService {

    private snapshotChangesSubscription: any;

    constructor(
        public afs: AngularFirestore,
        public afAuth: AngularFireAuth
    ){}

    getEvents(){
        return new Promise<any>((resolve, reject) => {
            this.afAuth.user.subscribe(currentUser => {
                if(currentUser){
                    this.snapshotChangesSubscription = this.afs.collection('people').doc(currentUser.uid).collection('tasks').snapshotChanges();
                    resolve(this.snapshotChangesSubscription);
                }
            })
        })
    }

    getEvent(eventId){
        return new Promise<any>((resolve, reject) => {
            this.afAuth.user.subscribe(currentUser => {
                if(currentUser){
                    this.snapshotChangesSubscription = this.afs.doc<any>('people/' + currentUser.uid + '/events/' + eventId).valueChanges()
                    .subscribe(snapshots => {
                        resolve(snapshots);
                    }, err => {
                        reject(err)
                    })
                }
            })
        });
    }

    unsubscribeOnLogOut(){
        //remember to unsubscribe from the snapshotChanges
        this.snapshotChangesSubscription.unsubscribe();
    }

    updateEvent(eventKey, value){
        return new Promise<any>((resolve, reject) => {
            let currentUser = firebase.auth().currentUser;
            this.afs.collection('people').doc(currentUser.uid).collection('events').doc(eventKey).set(value)
                .then(
                    res => resolve(res),
                    err => reject(err),
                )
        })
    }

    deleteEvent(eventKey){
        return new Promise<any>((resolve, reject) => {
            let currentUser = firebase.auth().currentUser;
            this.afs.collection('people').doc(currentUser.uid).collection('events').doc(eventKey).delete()
            .then(
                res => resolve(res),
                    err => reject(err)
            )
        })
    }

    createEvent(value){
        return new Promise<any>((resolve, reject) => {
            let currentUser = firebase.auth().currentUser;
            this.afs.collection('people').doc(currentUser.uid).collection('events').add({
                title: value.title,
                description: value.description,
                //image: value.image
                open: value.open,
            }).then(
                res => resolve(res),
                err => reject(err)
            )
        })
    }

    createProfile(uid, name) {
        return new Promise<any>((resolve, reject) => {
            let currentUser = firebase.auth().currentUser;
            this.afs.collection('profiles').doc(currentUser.uid).set({
                name: '',
            }).then(
                res => resolve(res),
                err => reject(err),
            )
        })
    }

    getProfile(uid) {
        return new Promise<any>((resolve, reject) => {
            this.snapshotChangesSubscription = this.afs.collection('people').doc(uid).snapshotChanges();
            resolve(this.snapshotChangesSubscription);
        })
    }

    getMe() {
        // TODO: use getProfile in here
        return new Promise<any>((resolve, reject) => {
            this.afAuth.user.subscribe(currentUser => {
                if(currentUser){
                    this.snapshotChangesSubscription = this.afs.collection('people').doc(currentUser.uid).snapshotChanges();
                    resolve(this.snapshotChangesSubscription);
                }
            })
        })
    }
}
