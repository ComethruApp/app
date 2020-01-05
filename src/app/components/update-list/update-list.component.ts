import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Update } from '../../services/api/models';

@Component({
    selector: 'app-update-list',
    templateUrl: './update-list.component.html',
    styleUrls: ['./update-list.component.scss'],
})
export class UpdateListComponent implements OnInit {
    @Input() users: User[];

    constructor(
        private router: Router,
    ) { }

    ngOnInit() {}

    openUser(userId: number) {
        this.router.navigate(['/user/' + userId]);
    }

    openUpdate(updateId: number) {
        this.router.navigate(['/event/' + this.eventId + '/updates/' + updateId]);
    }
}
