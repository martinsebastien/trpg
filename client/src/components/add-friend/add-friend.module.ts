import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { AddFriendComponent } from './add-friend';

@NgModule({
  declarations: [
    AddFriendComponent,
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    AddFriendComponent
  ]
})
export class AddFriendComponentModule {}
