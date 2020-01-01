import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-tag-list',
    templateUrl: './tag-list.component.html',
    styleUrls: ['./tag-list.component.scss'],
})
export class TagListComponent implements OnInit {
    @Input() eventId: number;
    @Input() tags: string[];
    @Input() current: string[];
    // Should we assume all tags in this list are current?
    @Input() isCurrent: boolean;
    @Input() emptyMessage: string;

    constructor() { }

    ngOnInit() {}
}
