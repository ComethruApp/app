import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'register', pathMatch: 'full' },
  { path: 'register', loadChildren: './pages/auth/register/register.module#RegisterPageModule', canActivate: [AuthGuard] },
  { path: 'login', loadChildren: './pages/auth/login/login.module#LoginPageModule', canActivate: [AuthGuard] },
  { path: 'reset-password', loadChildren: './pages/auth/reset-password/reset-password.module#ResetPasswordPageModule', canActivate: [AuthGuard] },

  { path: 'tabs', loadChildren: './pages/tabs/tabs.module#TabsPageModule' },
  { path: 'form-event/:id', loadChildren: './pages/form-event/form-event.module#FormEventPageModule' },
  { path: 'event/:id', loadChildren: './pages/event/event.module#EventPageModule' },
  { path: 'event/:eventId/form-update', loadChildren: './pages/form-update/form-update.module#FormUpdatePageModule' },
  { path: 'event/:eventId/form-update/:id', loadChildren: './pages/form-update/form-update.module#FormUpdatePageModule' },
  { path: 'event/:eventId/updates', loadChildren: './pages/updates/updates.module#UpdatesPageModule' },
  { path: 'event/:eventId/updates/:id', loadChildren: './pages/update/update.module#UpdatePageModule' },
  { path: 'invites/:id', loadChildren: './pages/invites/invites.module#InvitesPageModule' },
  { path: 'hosts/:id', loadChildren: './pages/hosts/hosts.module#HostsPageModule' },
  { path: 'tags/:id', loadChildren: './pages/tags/tags.module#TagsPageModule' },
  { path: 'reviews/:id', loadChildren: './pages/reviews/reviews.module#ReviewsPageModule' },
  { path: 'user/:id', loadChildren: './pages/user/user.module#UserPageModule' },
  { path: 'ticket/:id', loadChildren: './pages/ticket/ticket.module#TicketPageModule' },
  { path: 'users', loadChildren: './pages/users/users.module#UsersPageModule' },
  { path: 'settings', loadChildren: './pages/settings/settings.module#SettingsPageModule' },
  { path: 'help', loadChildren: './pages/help/help.module#HelpPageModule' },
  { path: 'about', loadChildren: './pages/about/about.module#AboutPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
