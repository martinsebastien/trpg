import { Component } from '@angular/core';

import { NavController, Platform } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { SocketService } from '../../services/socketService';
import { ConnectionService } from '../../services/connectionService';

import { HomePage } from '../home/home';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  socket: any;
  username: string;
  password: string;
  nextPage: any;

  constructor(
    public navCtrl: NavController,
    public socketService: SocketService,
    public connectionService: ConnectionService,
    public platform: Platform,
    public screenOriention: ScreenOrientation
  ) {
    this.socket = socketService.server();
    this.nextPage = HomePage;

    if (this.platform.is('android') || this.platform.is('ios')) {
      screenOriention.lock('portrait');
    }
  }

  ngOnInit() {
    this.connectionService.initConnection(this.socket, this.navCtrl, this.nextPage);
  }

  signIn() {
    let data = {
      username: this.username,
      password: this.password,
      token: this.connectionService.sessionId
    };
    this.connectionService.signIn(this.socket, data);
    this.password = '';
  }

}
