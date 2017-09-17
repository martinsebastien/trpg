import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';

import { SocketService } from '../../services/socketService';
import { FriendService } from '../../services/friendService';
import { UserService } from '../../services/userService';

@Component({
  selector: 'add-friend',
  templateUrl: 'add-friend.html'
})
export class AddFriendComponent {

  socket: any;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    public socketService: SocketService,
    public friendService: FriendService,
    public userService: UserService
  ) {
    this.socket = socketService.socket;
  }

  ngOnInit() {
    this.friendService.initFriendService(this.socket);
  }

  addFriend() {
    let alert = this.alertCtrl.create({
      title: 'Add a friend',
      subTitle: 'Enter the pseudo of your friend to add him to your friends list :',
      inputs: [
        {
          name: 'pseudo',
          placeholder: 'pseudo'
        }],
      buttons: [{
        text: 'Add',
        handler: data => {
          this.addFriendRequest(data.pseudo)
        }
      }]
    });
    alert.present();
  }

  addFriendRequest(pseudo) {
    let data = {
      me: this.userService.me,
      pseudo: pseudo
    };

    this.friendService.addFriendRequest(this.socket, data);
  }

}
