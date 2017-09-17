export class Friend {

    public id: number;
    public pseudo: number;
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
        console.log(f)
        return f;
    }

}