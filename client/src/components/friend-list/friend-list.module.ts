import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { FriendListComponent } from './friend-list';

@NgModule({
  declarations: [
    FriendListComponent,
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    FriendListComponent
  ]
})
export class FriendListComponentModule {}
