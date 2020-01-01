import { Component, OnInit, Input } from '@angular/core';
import { APIService } from '../../services/api/api.service';

@Component({
    selector: 'app-tag-buttons',
    templateUrl: './tag-buttons.component.html',
    styleUrls: ['./tag-buttons.component.scss'],
})
export class TagButtonsComponent implements OnInit {
    @Input() eventId: number;
    @Input() tag: string;
    @Input() added: boolean;

    constructor(
        private api: APIService,
    ) { }

    ngOnInit() {}

    addTag() {
        this.api.addTag(this.eventId, this.tag).subscribe(response => {
            this.added = true;
        });
    }

    removeTag() {
        this.api.removeTag(this.eventId, this.tag).subscribe(response => {
            this.added = false;
        });
    }
}
