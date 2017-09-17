import { Injectable } from '@angular/core';

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
            console.log(data)
            this.list = data
        });
    }

    onAlreadyFriendRequest(socket) {
        socket.on('SERVER_ALREADY_FRIEND_REQUEST', (data) => {
            console.log('You already sent a friend request to this user !')
        });
    }

}