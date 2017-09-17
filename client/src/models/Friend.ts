export class Friend {

    public id: number;
    public pseudo: string;
    public status: string;

    static build(data: any): Friend {

        const {
            id,
            pseudo,
            status
        } = data;

        const f = new Friend;
        f.id = id;
        f.pseudo = pseudo;
        f.status = status;
        return f;
    }

}