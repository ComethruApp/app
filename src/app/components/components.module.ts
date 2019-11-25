import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';

@NgModule({
    declarations: [
        UserListComponent
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
