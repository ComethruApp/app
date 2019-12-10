import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-help',
    templateUrl: './help.page.html',
    styleUrls: ['./help.page.scss'],
})
export class HelpPage implements OnInit {
    numbers: Object = {
        '911': 'Police and Fire Emergency',
        '203-432-4400': 'University Police Dispatch (non-emergencies)',
        '203-432-4415': 'University Police Patrol Coordinator',
        '203-432-4421': 'University Police Assistant Patrol Coordinator',
        '203-432-4406': 'University Police Investigative Services Unit',
        '203-432-4402': 'University Police Recruitment',
        '203-432-9547': 'Victim Services',
        '203-946-6285': 'New Haven PD Neighborhood Services',
        '203-785-5555': 'General Info (Lost IDs), Yale Security Central Alarm Station',
        '203-785-5555': 'Yale Security Central Alarm Station',
        '203-432-9255': '2-WALK',
        '203-432-6330': 'Nighttime safe rides',
        '203-432-6736': 'Access Control Systems',
        '203-432-9790': 'Yale Shuttle Bus (Daytime)',
        '203-432-6330': 'Yale Shuttle Bus (Nighttime)',
        '203-432-2788': 'Special Service Van',
    };
    objectKeys = Object.keys;

    constructor() { }

    ngOnInit() {
    }

}
