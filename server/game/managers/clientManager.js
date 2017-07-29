let r = require('rethinkdb')

class ClientManager {
    constructor(io, db) {
        this.io = io
        this.db = db
    }

    onClientConnection(client) {
        client.emit('SERVER_SESSION_ID', client.id)
        client.on('CLIENT_AUTH_REQUEST', this.onAuthTry.bind(this));
    }

    onAuthTry(user) {
        this.db.tryAuthenticate(user)
    }
}

module.exports = ClientManager