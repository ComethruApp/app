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
        this.api.getTags(this.id).subscribe(tags => {
            this.tags = tags;
        });
    }

    async searchTags(query) {
        if (query) {
            this.api.searchTags(this.id, query).subscribe(searchedTags => {
                this.searchedTags = searchedTags;
            });
        } else {
            this.searchedTags = null;
        }
    }
}
