import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInput } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from '../../services/api/api.service';
import { User, Event_ } from '../../services/api/models';

@Component({
    selector: 'app-hosts',
    templateUrl: './hosts.page.html',
    styleUrls: ['./hosts.page.scss'],
})
export class HostsPage implements OnInit {
    @ViewChild(IonInput, {static: false}) searchbar: IonInput;

    id: number;
    // Have they typed anything in search?
    hasTyped: boolean = false;
    // Is what they typed long enough to be searched for?
    searched: boolean = false;
    searchResults: User[] = null;
    hosts: User[] = null;
    event: Event_ = null;

    constructor(
        private route: ActivatedRoute,
        private api: APIService,
    ) { }

    ngOnInit() {
        this.id = parseInt(this.route.snapshot.paramMap.get('id'));
        this.getData();
    }

    async getData() {
        this.api.getEventHosts(this.id).subscribe(hosts => {
            this.hosts = hosts;
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
        this.searchResults = [];
        this.hasTyped = false;
        this.searched = false;
    }
}
