export default class User {
    constructor(data) {
        this.pseudo = data.name
        this.password = data.password
        this.role = data.role
    }

    create(db) {
        db.then(conn => {
            conn.use('trpg')
            r.table('users').insert({
                pseudo: this.pseudo,
                password: this.password,
                role: this.role
            }).run(conn).then(result => {
                console.log(result);
            })

        })
    }
}