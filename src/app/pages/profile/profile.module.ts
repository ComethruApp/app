import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProfilePage } from './profile.page';
import { ProfileResolver } from './profile.resolver';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage,
    resolve: {
      data: ProfileResolver,
    },
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProfilePage],
  providers: [ProfileResolver],
})
export class ProfilePageModule {}
