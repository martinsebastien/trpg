import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { MeStatusComponent } from './me-status';

@NgModule({
  declarations: [
    MeStatusComponent,
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    MeStatusComponent
  ]
})
export class MeStatusComponentModule {}
