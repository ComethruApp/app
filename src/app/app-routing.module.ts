import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'register', loadChildren: './pages/auth/register/register.module#RegisterPageModule', canActivate: [AuthGuard] },
  { path: 'login', loadChildren: './pages/auth/login/login.module#LoginPageModule', canActivate: [AuthGuard] },

  { path: 'tabs', loadChildren: './pages/tabs/tabs.module#TabsPageModule' },
  { path: 'form-event/:id', loadChildren: './pages/form-event/form-event.module#FormEventPageModule' },
  { path: 'event/:id', loadChildren: './pages/event/event.module#EventPageModule' },
  { path: 'invites/:id', loadChildren: './pages/invites/invites.module#InvitesPageModule' },
  { path: 'profile/:id', loadChildren: './pages/profile/profile.module#ProfilePageModule' },
  { path: 'search-users', loadChildren: './pages/search-users/search-users.module#SearchUsersPageModule' },
  { path: 'friend-requests', loadChildren: './pages/friend-requests/friend-requests.module#FriendRequestsPageModule' },
  { path: 'settings', loadChildren: './pages/settings/settings.module#SettingsPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
