import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { User, Event_ } from '../../services/api/models';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
    @Input() users: User[];
    @Input() emptyMessage: string;
    // Types of buttons to show next to users
    @Input() friend: boolean = false;
    @Input() invite: boolean = false;
    @Input() host: boolean = false;
    // Are the users in this list already invited or not?
    @Input() invited: boolean;
    @Input() hosting: boolean;
    @Input() eventId: number = null;

    constructor(
        private router: Router,
    ) { }

    ngOnInit() { }

    openProfile(userId) {
        this.router.navigate(['/profile/' + userId]);
    }
}
