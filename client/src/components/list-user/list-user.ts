import { Component } from '@angular/core';

@Component({
  selector: 'list-user',
  templateUrl: 'list-user.html'
})
export class ListUserComponent {

  text: string;

  constructor() {
    console.log('Hello ListUserComponent Component');
    this.text = 'Hello World';
  }

}
