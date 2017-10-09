import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { PlayerStatusComponent } from './player-status';

@NgModule({
  declarations: [
    PlayerStatusComponent,
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    PlayerStatusComponent
  ]
})
export class PlayerStatusComponentModule {}
