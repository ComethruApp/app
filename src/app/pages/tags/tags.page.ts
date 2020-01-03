import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from '../../services/api/api.service';
import { User, Event_ } from '../../services/api/models';

@Component({
    selector: 'app-tags',
    templateUrl: './tags.page.html',
    styleUrls: ['./tags.page.scss'],
})
export class TagsPage implements OnInit {
    id: number;
    searchedTags: string[] = null;
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
            this.tags = event.tags;
        });
    }

    async searchTags(query) {
        if (query) {
            this.api.searchTags(this.id, query).subscribe(searchedTags => {
                if (searchedTags.indexOf(query) === -1) {
                    searchedTags.unshift(query);
                }
                this.searchedTags = searchedTags;
            });
        } else {
            this.searchedTags = null;
        }
    }
}
