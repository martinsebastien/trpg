import { Component } from '@angular/core';
import { PopoverController } from 'ionic-angular';

import { FriendRequestService } from '../../services/friendRequestService';
import { SocketService } from '../../services/socketService';

import { FriendRequestPopoverPage } from '../../pages/friend-request-popover/friend-request-popover';

@Component({
  selector: 'friend-requests',
  templateUrl: 'friend-requests.html'
})
export class FriendRequestsComponent {
  socket: any;

  constructor(
    public friendRequestService: FriendRequestService,
    public socketService: SocketService,
    public popoverCtrl: PopoverController
  ) {
    this.socket = socketService.socket;
    this.friendRequestService.initFriendRequestService(this.socket)
  }

  showRequests() {
    let popover = this.popoverCtrl.create(FriendRequestPopoverPage);
    let windowWidth = window.innerWidth;
    let formula

    windowWidth > 960 ? formula = 'calc(100vw - 44px)' : formula = 'calc((100vw - 960px)/2 + 44px)';

    let ev = {
      target: {
        getBoundingClientRect: () => {
          return {
            top: '75',
            left: formula
          };
        }
      }
    };
    popover.present({ ev });
  }

}
