import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-ocean',
    templateUrl: './ocean.component.html',
    styleUrls: ['./ocean.component.scss']
})
export class OceanComponent implements OnInit {
    @Input() people: number;
    @Input() capacity: number;

    constructor() { }

    ngOnInit() {
    }
}
