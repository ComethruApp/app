import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FormUpdatePage } from './form-update.page';

import { ComponentsModule } from '../../components/components.module';

const routes: Routes = [
    {
        path: '',
        component: FormUpdatePage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ReactiveFormsModule,
        ComponentsModule,
        RouterModule.forChild(routes)
    ],
    declarations: [FormUpdatePage]
})
export class FormUpdatePageModule {}
