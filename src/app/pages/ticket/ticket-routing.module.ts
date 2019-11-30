import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TicketPage } from './ticket.page';

const routes: Routes = [
  {
    path: '',
    component: TicketPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TicketPageRoutingModule {}
