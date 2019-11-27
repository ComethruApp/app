import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

import { UserListComponent } from './user-list/user-list.component';
import { FriendButtonsComponent } from './friend-buttons/friend-buttons.component';
import { AvatarComponent } from './avatar/avatar.component';
import { EventListComponent } from './event-list/event-list.component';
import { OceanComponent } from './ocean/ocean.component';
import { MoonComponent } from './moon/moon.component';
import { RefresherComponent } from './refresher/refresher.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
    declarations: [
        UserListComponent,
        FriendButtonsComponent,
        AvatarComponent,
        EventListComponent,
        OceanComponent,
        MoonComponent,
        RefresherComponent,
        ToolbarComponent,
    ],
    imports: [
        IonicModule,
        CommonModule,
    ],
    exports: [
        UserListComponent,
        FriendButtonsComponent,
        AvatarComponent,
        EventListComponent,
        OceanComponent,
        MoonComponent,
        RefresherComponent,
        ToolbarComponent,
    ],
})
export class ComponentsModule {}
