import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { UserListComponent } from './user-list/user-list.component';
import { FriendButtonsComponent } from './friend-buttons/friend-buttons.component';
import { AvatarComponent } from './avatar/avatar.component';
import { EventListComponent } from './event-list/event-list.component';
import { OceanComponent } from './ocean/ocean.component';
import { MoonComponent } from './moon/moon.component';
import { RefresherComponent } from './refresher/refresher.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
    declarations: [
        UserListComponent,
        FriendButtonsComponent,
        AvatarComponent,
        EventListComponent,
        OceanComponent,
        MoonComponent,
        RefresherComponent,
        HeaderComponent,
    ],
    imports: [
        IonicModule,
        CommonModule,
        RouterModule,
    ],
    exports: [
        UserListComponent,
        FriendButtonsComponent,
        AvatarComponent,
        EventListComponent,
        OceanComponent,
        MoonComponent,
        RefresherComponent,
        HeaderComponent,
    ],
})
export class ComponentsModule {}
