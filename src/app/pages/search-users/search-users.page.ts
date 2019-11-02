import { Component, OnInit } from '@angular/core';
import { APIService } from '../../services/api/api.service';
import { User } from '../../services/api/models';

@Component({
    selector: 'app-search-users',
    templateUrl: './search-users.page.html',
    styleUrls: ['./search-users.page.scss'],
})
export class SearchUsersPage implements OnInit {
    users: User[];

    constructor(
        private apiService: APIService,
    ) { }

    ngOnInit() {
    }

    async getData(query) {
        this.apiService.searchUsers(query).subscribe(users => {
            this.users = users;
        });
    }
}
