import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInput } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from '../../services/api/api.service';
import { User, Event_ } from '../../services/api/models';

@Component({
    selector: 'app-tags',
    templateUrl: './tags.page.html',
    styleUrls: ['./tags.page.scss'],
})
export class TagsPage implements OnInit {
    @ViewChild(IonInput, {static: false}) searchbar: IonInput;

    id: number;
    searched: boolean = false;
    searchResults: string[] = null;
    event: Event_ = null;
    tags: string[] = null;

    constructor(
        private route: ActivatedRoute,
        private api: APIService,
    ) { }

    ngOnInit() {
        this.id = parseInt(this.route.snapshot.paramMap.get('id'));
        this.getData();
    }

    async getData() {
        this.api.getEvent(this.id).subscribe(event => {
            this.event = event;
            this.tags = event.tags;
        });
    }

    async searchTags(query) {
        if (query) {
            this.searchResults = null;
            this.api.searchTags(query).subscribe(searchResults => {
                if (searchResults.indexOf(query) === -1) {
                    searchResults.unshift(query);
                }
                this.searchResults = searchResults;
            });
            this.searched = true;
        } else {
            this.searchResults = null;
            this.searched = false;
        }
    }

    clearSearch() {
        this.searchbar.value = '';
        this.searchResults = [];
    }
}
