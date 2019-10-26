import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule} from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EventPage } from './event.page';
import { EventResolver } from './event.resolver';

const routes: Routes = [
    {
        path: '',
        component: EventPage,
        resolve: {
            data: EventResolver,
        },
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes)
    ],
    declarations: [EventPage],
    providers:[EventResolver],
})
export class EventPageModule {}
