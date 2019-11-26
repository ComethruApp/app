import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { FriendButtonsComponent } from './friend-buttons/friend-buttons.component';
import { AvatarComponent } from './avatar/avatar.component';
import { EventListComponent } from './event-list/event-list.component';

@NgModule({
    declarations: [
        UserListComponent,
        FriendButtonsComponent,
        AvatarComponent,
        EventListComponent,
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
    ],
})
export class ComponentsModule {}
