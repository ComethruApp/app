import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
    @Input() showMessage: boolean = true;
    message: string;

    constructor(
    ) { }

    ngOnInit() {
        let choices: string[] = [
            'Pregaming',
            'Getting ready',
            'Loading',
            'Tailgating',
        ]
        let index: number = Math.floor(Math.random() * choices.length);
        this.message = choices[index];
    }
}
