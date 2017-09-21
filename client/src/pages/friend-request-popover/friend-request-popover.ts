import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FriendRequestService } from '../../services/friendRequestService';
import { SocketService } from '../../services/socketService';

@IonicPage()
@Component({
  selector: 'page-friend-request-popover',
  templateUrl: 'friend-request-popover.html',
})
export class FriendRequestPopoverPage {
  socket: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public friendRequestService: FriendRequestService,
    public socketService: SocketService
  ) {
    this.socket = socketService.server();
  }

  acceptRequest(data) {
    this.friendRequestService.acceptRequest(this.socket, data)
  }

  declineRequest(data) {
    this.friendRequestService.declineRequest(this.socket, data)
  }

}
