import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

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
  ) {
    this.socket = socketService.server();
    this.nextPage = HomePage;
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
