import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../services/api/models';

@Component({
    selector: 'app-avatar',
    templateUrl: './avatar.component.html',
    styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {
    @Input() user: User;
    @Input() large: boolean = false;
    avatar: string;

    constructor() { }

    ngOnInit() {
    }
}
