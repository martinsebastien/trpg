import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserService } from '../../services/userService';

@Component({
  selector: 'menu',
  templateUrl: 'menu.html'
})
export class MenuComponent {

  socket: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userService: UserService
  ) { }

}
