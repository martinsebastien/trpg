import { Injectable } from '@angular/core';

import { FriendRequest } from '../models/FriendRequest';

@Injectable()
export class FriendRequestService {

    list = []

    constructor(
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
            console.log('You already sent a friend request to this user !')
        });
    }

    acceptRequest(socket, data) {
        socket.emit('CLIENT_ACCEPT_FRIEND_REQUEST', data);
    }

    declineRequest(socket, data) {
        socket.emit('CLIENT_DECLINE_FRIEND_REQUEST', data);
    }

}