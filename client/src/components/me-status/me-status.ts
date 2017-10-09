import { Component } from '@angular/core';
import { UserService } from '../../services/userService';

@Component({
  selector: 'me-status',
  templateUrl: 'me-status.html'
})
export class MeStatusComponent {

  constructor(
    public userService: UserService
  ) {
  }

}
