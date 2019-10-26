import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'register', loadChildren: './pages/auth/register/register.module#RegisterPageModule' },
  { path: 'login', loadChildren: './pages/auth/login/login.module#LoginPageModule' },

  { path: 'tabs', loadChildren: './pages/tabs/tabs.module#TabsPageModule' },
  { path: 'event', loadChildren: './pages/event/event.module#EventPageModule' },
  //{ path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule' },
  //{ path: 'form-event', loadChildren: './pages/form-event/form-event.module#FormEventPageModule' },
  /*
  { path: 'details/:id', loadChildren: './pages/details/details.module#DetailsPageModule' },
  { path: 'feed', loadChildren: './pages/feed/feed.module#FeedPageModule' },
  { path: 'new-event', loadChildren: './pages/new-event/new-event.module#NewEventPageModule' },
    */
  // { path: 'new-event-modal', loadChildren: './new-event-modal/new-event-modal.module#NewEventModalPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
