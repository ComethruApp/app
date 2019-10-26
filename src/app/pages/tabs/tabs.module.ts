import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';

import { FeedPageModule } from '../feed/feed.module';
import { FormEventPageModule } from '../form-event/form-event.module';
import { ProfilePageModule } from '../profile/profile.module';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children:[
        { path: '', redirectTo: 'feed', pathMatch: 'full' },
        { path: 'feed', component: FeedPageModule },
        //{ path: 'map', component: MapPageModule },
        { path: 'form-event', component: FormEventPageModule },
        { path: 'profile', component: ProfilePageModule },
    ]
  },
  {
    path: '',
    redirectTo: '/feed',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
