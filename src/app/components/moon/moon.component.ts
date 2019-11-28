import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-moon',
    templateUrl: './moon.component.html',
    styleUrls: ['./moon.component.scss']
})
export class MoonComponent implements OnInit {
    @Input() rating: number;
    @Input() large: boolean = false;
    darknessPosition: number;

    constructor() { }

    ngOnInit() {
        this.darknessPosition = (this.large ? 150 : 75) / 5 * this.rating;
    }
}
