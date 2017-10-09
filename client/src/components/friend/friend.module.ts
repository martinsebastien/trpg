import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { FriendComponent } from './friend';

@NgModule({
  declarations: [
    FriendComponent,
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    FriendComponent
  ]
})
export class FriendComponentModule {}
