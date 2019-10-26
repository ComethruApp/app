import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children:[
    //    { path: 'feed', loadChildren: '../feed/feed.module#FeedPageModule' },
    //    { path: 'map', loadChildren: '../map/map.module#MapPageModule' },
        { path: 'form-event', loadChildren: '../form-event/form-event.module#FormEventPageModule' },
        { path: 'profile', loadChildren: '../profile/profile.module#ProfilePageModule' },
    ]
  },
  {
    path: '',
    redirectTo: '/home',
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
