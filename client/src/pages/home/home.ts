import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SocketService } from '../../services/socketService';
import { ConnectionService } from '../../services/connectionService';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  socket: any;
  pseudo: string;
  password: string;

  constructor(
    public navCtrl: NavController,
    public socketService: SocketService,
    public connectionService: ConnectionService,
  ) {
    this.socket = socketService.server();
  }

  ngOnInit() {
    this.connectionService.initConnection(this.socket);
  }

  signIn() {
    let data = {
      pseudo: this.pseudo,
      password: this.password,
      token: this.connectionService.sessionId
    };
    this.connectionService.signIn(this.socket, data);
    this.password = '';
  }

}
