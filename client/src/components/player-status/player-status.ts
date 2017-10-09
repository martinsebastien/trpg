import { Component, Input } from '@angular/core';

@Component({
  selector: 'player-status',
  templateUrl: 'player-status.html'
})
export class PlayerStatusComponent {
  @Input() status: string;

  constructor() {
  }

}
