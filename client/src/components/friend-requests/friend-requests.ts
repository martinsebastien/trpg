import { Component } from '@angular/core';

import { FriendRequestService } from '../../services/friendRequestService';
import { SocketService } from '../../services/socketService';

@Component({
  selector: 'friend-requests',
  templateUrl: 'friend-requests.html'
})
export class FriendRequestsComponent {
    socket: any;

  constructor(
    public friendRequestService: FriendRequestService,
    public socketService: SocketService,
  ) {
    this.socket = socketService.socket;
    this.friendRequestService.initFriendRequestService(this.socket)
  }

  showRequests() {
    console.log(this.friendRequestService.list)
  }

}
