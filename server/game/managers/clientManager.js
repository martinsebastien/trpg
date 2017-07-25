class ClientManager {
    constructor(io, db) {
        this.io = io
        this.db = db
    }

    onClientConnection(client) {
        console.log(client.id)
        client.on('CLIENT_AUTH_REQUEST', this.onAuthTry);
    }

    onAuthTry(user) {
        this.db.then(conn => {
            conn.use('trpg')
            r.table('users')
             .filter({ pseudo: user.pseudo })
             .run(conn)
             .then(result => {
                this.userFounded = result
                if (this.userFounded.password === user.password) {
                    console.log('Connection réussie !')
                 } else {
                     console.log('Mot de passe incorrect!')
                 }
             })
        })
    }
}

module.exports = ClientManager