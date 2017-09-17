import { Friend } from './Friend';

export class FriendRequest {

    public id: number;
    public from: Friend;

    static build(data: any): FriendRequest {

        const {
            id,
            from
        } = data;

        const f = new FriendRequest;
        f.id = id;
        f.from = Friend.build(from);
        return f;
    }

}