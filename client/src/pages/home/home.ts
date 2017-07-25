import { Component, ViewChild } from '@angular/core';
import { NavController, Content } from 'ionic-angular';

import { SocketService } from '../../services/socketService';
import { MessageService } from '../../services/messageService';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Content) content: Content;

  socket: any;
  connection: any;
  chat: any;
  username: string;

  constructor(
    public navCtrl: NavController,
    public socketService: SocketService,
    public messageService: MessageService,
  ) {
    this.socket = socketService.server();
  }

  chatSend(msg) {
    let data = {
      username: this.username,
      message: msg.textChat
    };

    this.messageService.sendMessage(this.socket, data);
    this.chat = '';
  }

  ngOnInit() {
    this.connection = this.messageService.getMessages(this.socket)
  }
}
