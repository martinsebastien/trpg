import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  socket: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public screenOriention: ScreenOrientation
  ) {
    if (this.platform.is('android') || this.platform.is('ios')) {
      screenOriention.lock('landscape');
    }
  }

  ngOnInit() {
  }

}
