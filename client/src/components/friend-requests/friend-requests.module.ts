import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { FriendRequestsComponent } from './friend-requests';

@NgModule({
  declarations: [
    FriendRequestsComponent,
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    FriendRequestsComponent
  ]
})
export class FriendRequestsComponentModule {}
