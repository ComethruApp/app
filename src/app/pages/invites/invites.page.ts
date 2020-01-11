import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInput } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from '../../services/api/api.service';
import { User, Event_ } from '../../services/api/models';

@Component({
    selector: 'app-invites',
    templateUrl: './invites.page.html',
    styleUrls: ['./invites.page.scss'],
})
export class InvitesPage implements OnInit {
    @ViewChild(IonInput, {static: false}) searchbar: IonInput;

    id: number;
    // Have they typed anything in search?
    hasTyped: boolean = false;
    // Is what they typed long enough to be searched for?
    searched: boolean = false;
    searchResults: User[] = null;
    invites: User[] = null;
    event: Event_ = null;

    constructor(
        private api: APIService,
        private route: ActivatedRoute,
    ) { }

    ngOnInit() {
        this.id = parseInt(this.route.snapshot.paramMap.get('id'));
        this.getData();
    }

    async getData() {
        this.api.getEventInvites(this.id).subscribe(invites => {
            this.invites = invites;
        });
    }

    async searchUsers(query) {
        this.hasTyped = Boolean(query);
        if (this.hasTyped) {
            if (query.length >= 3) {
                this.searchResults = null;
                this.searched = true;
                this.api.searchUsersForEvent(this.id, query).subscribe(searchResults => {
                    this.searchResults = searchResults;
                });
            } else {
                this.searchResults = [];
                this.searched = true;
            }
        } else {
            this.searchResults = [];
            this.searched = false;
        }
    }

    clearSearch() {
        this.searchbar.value = '';
        this.searchedTags = [];
        this.hasTyped = false;
        this.searched = false;
    }
}
