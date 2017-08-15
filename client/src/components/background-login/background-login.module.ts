import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { BackgroundLoginComponent } from './background-login';

@NgModule({
  declarations: [
    BackgroundLoginComponent,
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    BackgroundLoginComponent
  ]
})
export class BackgroundLoginComponentModule {}
