import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-avatar',
    templateUrl: './avatar.component.html',
    styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {
    @Input() hash: string;
    @Input() large: boolean = false;
    size: number;

    constructor() { }

    ngOnInit() {
        this.size = this.large ? 512 : 128;
    }

}
