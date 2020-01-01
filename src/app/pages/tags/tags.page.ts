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
    searchedUsers: User[] = null;
    tags: User[] = null;
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
        this.api.getEventTags(this.id).subscribe(tags => {
            this.tags = tags;
        });
    }

    async searchUsers(query) {
        if (query) {
            this.api.searchUsersForEvent(this.id, query).subscribe(searchedUsers => {
                this.searchedUsers = searchedUsers;
            });
        } else {
            this.searchedUsers = null;
        }
    }
}
