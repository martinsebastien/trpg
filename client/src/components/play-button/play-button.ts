import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { PlayPage } from '../../pages/play/play';

@Component({
  selector: 'play-button',
  templateUrl: 'play-button.html'
})
export class PlayButtonComponent {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) { }

  pushToPlayPage() {
    this.navCtrl.push(PlayPage);
  }

}
