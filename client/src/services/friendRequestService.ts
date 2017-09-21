import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

import { FriendRequest } from '../models/FriendRequest';

@Injectable()
export class FriendRequestService {

    list = []

    constructor(
        public toastCtrl: ToastController,
    ) { }

    initFriendRequestService(socket) {
        this.onFriendRequestUpdate(socket);
        this.onAlreadyFriendRequest(socket);
    }

    onFriendRequestUpdate(socket) {
        socket.on('SERVER_UPDATE_FRIEND_REQUEST', (data) => {
            this.list = data.map(friend => FriendRequest.build(friend));
        });
    }

    onAlreadyFriendRequest(socket) {
        socket.on('SERVER_ALREADY_FRIEND_REQUEST', (data) => {
            this.presentToast('You already sent a friend request to this user or you already have a friend request from him')
        });
    }

    acceptRequest(socket, data) {
        socket.emit('CLIENT_ACCEPT_FRIEND_REQUEST', data);
    }

    declineRequest(socket, data) {
        socket.emit('CLIENT_DECLINE_FRIEND_REQUEST', data);
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