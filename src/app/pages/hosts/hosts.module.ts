import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HostsPage } from './hosts.page';

import { ComponentsModule } from '../../components/components.module';

const routes: Routes = [
    {
        path: '',
        component: HostsPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ComponentsModule,
        RouterModule.forChild(routes)
    ],
    declarations: [HostsPage]
})
export class HostsPageModule {}
