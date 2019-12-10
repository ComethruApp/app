import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
    message: string;
    @Input() showMessage: boolean = true;

    constructor(
    ) { }

    ngOnInit() {
        let choices: string[] = [
            'Pregaming',
            'Getting ready',
            'Loading',
            'Tailgating',
        ]
        console.log(choices);
        let index: number = Math.floor(Math.random() * choices.length);
        this.message = choices[index];
        console.log(this.message);
    }
}
