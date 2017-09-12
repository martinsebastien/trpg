import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

import { UserService } from './userService';

@Injectable()
export class FriendService {

    constructor(
        public toastCtrl: ToastController,
        public userService: UserService
    ) { }

    initFriendService(socket) {
        this.onFailAddFriend(socket);
        this.onSuccessAddFriend(socket);
    }

    onFailAddFriend(socket) {
        socket.on('SERVER_FAIL_ADD_FRIEND_IS_ME', (data) => {
            this.presentToast('You can\'t add yourself as friend, even if there is a lot of people in your head. Sorry ...');
        })
        socket.on('SERVER_FAIL_ADD_FRIEND_ALREADY_FRIEND', (data) => {
            this.presentToast('You already are friend');
        })
        socket.on('SERVER_FAIL_ADD_FRIEND_DOES_NOT_EXIST', (data) => {
            this.presentToast('No player found with that awkward pseudo.');
        })
    }

    onSuccessAddFriend(socket) {
        socket.on('SERVER_SUCCESS_ADD_FRIEND', (data) => {
            this.userService.setFriendList(data.friendList);
            this.presentToast('Friend added successfully !');
        })
    }

    addFriendRequest(socket, data) {
        socket.emit('CLIENT_ADD_FRIEND', data);
    }

    presentToast(text) {
        let toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'bottom'
        });
        toast.present();
    }

}