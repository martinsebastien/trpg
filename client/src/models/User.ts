export class User {

    public id: number;
    public username: string;
    public pseudo: number;
    public friendList: string;
    public token: string;

    static build(data: any): User {

        const {
            id,
            username,
            pseudo,
            friendList,
            token
        } = data;

        const u = new User;
        u.id = id;
        u.username = username;
        u.pseudo = pseudo;
        u.friendList = friendList;
        u.token = token;

        return u;
    }

}