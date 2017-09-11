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

}