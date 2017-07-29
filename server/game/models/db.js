class DataBase {
    constructor(r, io) {
        var self = this

        this.r = r
        this.io = io
        this.connection = null
        this.db = this.r.connect({ host: 'localhost', port: 28015, db: 'trpg' }, (err, conn) => {
            if (err) throw err
            self.connection = conn
        })
    }

    getConnection() {
        return this.connection
    }

    createUser(user) {
        this.db.then(conn => {
            r.table('users').insert({
                pseudo: user.pseudo,
                password: user.password,
                role: 'player'
            }).run(conn)
        })
    }

    tryAuthenticate(client) {
        var self = this

        this.r.table('users')
            .filter({
                pseudo: client.pseudo,
                password: client.password
            })
            .run(self.connection, (err, cursor) => {
                if (err) throw err;
                cursor.toArray(function (err, result) {
                    if (err) throw err;
                    let user = result[0]
                    if (!user) {
                        self.io.emit('SERVER_FAIL_LOGIN')
                    } else {
                        if (user.online == true) {
                            self.io.to(user.token).emit('SERVER_DISCONNECT_CLIENT')
                            self.r.table('users')
                                .get(user.id)
                                .update({ token: client.token })
                                .run(self.connection)
                            self.io.emit('SERVER_SUCCESS_LOGIN')
                        } else {
                            self.r.table('users')
                                .get(user.id)
                                .update({
                                    token: client.token,
                                    online: true
                                })
                                .run(self.connection)
                            self.io.emit('SERVER_SUCCESS_LOGIN')
                        }
                    }
                });
            })

    }

    async getUser(client) {
        /*
        this.getUser(client)
            .then((err, cursor) => {
                console.log('ok')
                if (err) throw err
                cursor.toArray((err, result) => {
                    if (err) throw err
                    console.log(result)
                })
            })
            .catch(() => {
                console.log('Error!')
            })

        var self = this
        return await this.r.table('users')
            .filter({
                pseudo: client.pseudo,
                password: client.password
            })
            .run(self.connection)*/
    }

}

module.exports = DataBase