import { Injectable } from '@angular/core';
import { User } from '../models/User';

@Injectable()
export class UserService {
    me: User;

    constructor(
    ) {}

    initUser(data) {
        this.me = User.build(data);
    }

    setFriendList(data) {
        this.me.friendList = data;
    }

    setPseudo(data) {
        this.me.pseudo = data;
    }

}