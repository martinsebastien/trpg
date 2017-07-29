let clientManager = require('./managers/clientManager');

class GameServer {
    constructor(io, db) {
        this.io = io
        this.db = db
        this.client = new clientManager(this.io, this.db);
    }

    start() {
        this.io.on('connection', this.client.onClientConnection.bind(this.client))
    }
}

module.exports = GameServer;