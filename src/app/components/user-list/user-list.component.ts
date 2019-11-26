import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../services/api/models';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
    @Input() users: User[];
    @Input() emptyMessage: string;

    constructor(
        private router: Router,
    ) { }

    ngOnInit() { }

    openProfile(userId) {
        this.router.navigate(['/profile/' + userId]);
    }
}
