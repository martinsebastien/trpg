import { Friend } from './Friend';

export class User {

    public id: number;
    public username: string;
    public pseudo: string;
    public friendList: string;
    public status: string;
    public token: string;

    static build(data: any): User {

        const {
            id,
            username,
            pseudo,
            friendList,
            token,
            status
        } = data;

        const u = new User;
        u.id = id;
        u.username = username;
        u.pseudo = pseudo;
        u.friendList = friendList.map(friend => Friend.build(friend));
        u.token = token;
        u.status = status;

        return u;
    }

}