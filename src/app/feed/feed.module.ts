import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FeedPage } from './home.page';
import { FeedResolver } from './home.resolver';

const routes: Routes = [
  {
    path: '',
    component: FeedPage,
    resolve: {
      data: FeedResolver
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FeedPage],
  providers: [
    FeedResolver
  ]
})
export class FeedPageModule {}
