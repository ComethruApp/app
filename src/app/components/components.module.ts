import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { FriendButtonsComponent } from './friend-buttons/friend-buttons.component';
import { AvatarComponent } from './avatar/avatar.component';

@NgModule({
    declarations: [
        UserListComponent,
        FriendButtonsComponent,
        AvatarComponent,
    ],
    imports: [
        IonicModule,
        CommonModule,
    ],
    exports: [
        UserListComponent,
        FriendButtonsComponent,
        AvatarComponent,
    ],
})
export class ComponentsModule {}
