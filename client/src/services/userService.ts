import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { Friend } from '../models/Friend';

@Injectable()
export class UserService {
    me: User;

    constructor(
    ) {}

    initUser(data) {
        this.me = User.build(data);
    }

    setFriendList(data) {
        console.log(data)
        this.me.friendList = data.map(friend => Friend.build(friend));
    }

    setPseudo(data) {
        this.me.pseudo = data;
    }

}