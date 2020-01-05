import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Update } from '../../services/api/models';

@Component({
    selector: 'app-update-list',
    templateUrl: './update-list.component.html',
    styleUrls: ['./update-list.component.scss'],
})
export class UpdateListComponent implements OnInit {
    @Input() updates: Update[];

    constructor(
        private router: Router,
    ) { }

    ngOnInit() {}

    openUser(userId: number) {
        this.router.navigate(['/user/' + userId]);
    }

    openUpdate(eventId: number, updateId: number) {
        this.router.navigate(['/event/' + eventId + '/updates/' + updateId]);
    }
}
