import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { FriendButtonsComponent } from './friend-buttons/friend-buttons.component';

@NgModule({
    declarations: [
        UserListComponent,
        FriendButtonsComponent
    ],
    imports: [
        IonicModule,
        CommonModule,
    ],
    exports: [
        UserListComponent
    ],
})
export class ComponentsModule {}
