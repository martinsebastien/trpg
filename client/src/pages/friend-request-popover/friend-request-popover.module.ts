import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FriendRequestPopoverPage } from './friend-request-popover';

@NgModule({
  declarations: [
    FriendRequestPopoverPage,
  ],
  imports: [
    IonicPageModule.forChild(FriendRequestPopoverPage),
  ],
  exports: [
    FriendRequestPopoverPage
  ]
})
export class FriendRequestPopoverPageModule {}
