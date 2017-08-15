import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { MenuComponent } from './menu';

@NgModule({
  declarations: [
    MenuComponent,
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    MenuComponent
  ]
})
export class MenuComponentModule {}
