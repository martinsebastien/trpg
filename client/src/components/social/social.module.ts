import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { SocialComponent } from './social';

@NgModule({
  declarations: [
    SocialComponent,
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    SocialComponent
  ]
})
export class SocialComponentModule {}
