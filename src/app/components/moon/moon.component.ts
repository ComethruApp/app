import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-moon',
    templateUrl: './moon.component.html',
    styleUrls: ['./moon.component.scss']
})
export class MoonComponent implements OnInit {
    @Input() people: number;
    @Input() capacity: number;
    @Input() large: boolean = false;

    constructor() { }

    ngOnInit() {
    }
}
