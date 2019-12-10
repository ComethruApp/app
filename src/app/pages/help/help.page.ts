import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-help',
    templateUrl: './help.page.html',
    styleUrls: ['./help.page.scss'],
})
export class HelpPage implements OnInit {
    numbers: Object = {
        'Police and Fire Emergency': '911',
        'University Police Dispatch (non-emergencies)': '203-432-4400',
        'Sexual Harassment and Assault Response & Education (SHARE)': '203-432-2000',
        'Victim Services': '203-432-9547',
        'New Haven PD Neighborhood Services': '203-946-6285',
        'Yale Security Central Alarm Station': '203-785-5555',
        '2-WALK': '203-432-9255',
        'Nighttime safe rides': '203-432-6330',
        'Access Control Systems': '203-432-6736',
        'Yale Shuttle Bus (Nighttime)': '203-432-6330',
        'Yale Shuttle Bus (Daytime)': '203-432-9790',
        'Special Service Van': '203-432-2788'
    };
    objectKeys = Object.keys;

    constructor() { }

    ngOnInit() {
    }

}
