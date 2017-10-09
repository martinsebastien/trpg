import { Component, Input } from '@angular/core';
import { Friend } from '../../models/Friend';

@Component({
  selector: 'friend',
  templateUrl: 'friend.html'
})
export class FriendComponent{
  @Input() friend: Friend;

  constructor() {
  }
}
