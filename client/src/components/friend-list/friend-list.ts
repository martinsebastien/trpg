import { Component } from '@angular/core';

import { UserService } from '../../services/userService';

@Component({
  selector: 'friend-list',
  templateUrl: 'friend-list.html'
})
export class FriendListComponent {

  constructor(
    public userService: UserService
  ) {}

}
