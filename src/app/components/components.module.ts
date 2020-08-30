import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { UserListComponent } from './user-list/user-list.component';
import { UpdateListComponent } from './update-list/update-list.component';
import { TagListComponent } from './tag-list/tag-list.component';
import { TagButtonsComponent } from './tag-buttons/tag-buttons.component';
import { FriendButtonsComponent } from './friend-buttons/friend-buttons.component';
import { AvatarComponent } from './avatar/avatar.component';
import { EventListComponent } from './event-list/event-list.component';
import { OceanComponent } from './ocean/ocean.component';
import { MoonComponent } from './moon/moon.component';
import { LoaderComponent } from './loader/loader.component';
import { HeaderComponent } from './header/header.component';
import { InviteButtonsComponent } from './invite-buttons/invite-buttons.component';
import { HostButtonsComponent } from './host-buttons/host-buttons.component';
import { ReviewerComponent } from './reviewer/reviewer.component';
import { BannerComponent } from './banner/banner.component';

@NgModule({
    declarations: [
        UserListComponent,
        UpdateListComponent,
        TagListComponent,
        TagButtonsComponent,
        FriendButtonsComponent,
        AvatarComponent,
        EventListComponent,
        OceanComponent,
        MoonComponent,
        LoaderComponent,
        HeaderComponent,
        InviteButtonsComponent,
        HostButtonsComponent,
        ReviewerComponent,
        BannerComponent,
    ],
    imports: [
        IonicModule,
        CommonModule,
        RouterModule,
    ],
    exports: [
        UserListComponent,
        UpdateListComponent,
        TagListComponent,
        TagButtonsComponent,
        FriendButtonsComponent,
        AvatarComponent,
        EventListComponent,
        OceanComponent,
        MoonComponent,
        LoaderComponent,
        HeaderComponent,
        InviteButtonsComponent,
        HostButtonsComponent,
        ReviewerComponent,
        BannerComponent,
    ],
})
export class ComponentsModule {}
