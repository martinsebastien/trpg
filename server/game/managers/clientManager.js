let r = require('rethinkdb')
let user = require('../models/user');

class ClientManager {
    constructor(io, db) {
        this.io = io
        this.db = db
    }

    onClientConnection(client) {
        client.emit('SERVER_SESSION_ID', client.id)
        client.on('CLIENT_AUTH_REQUEST', onAuthTry.bind(this))
        client.on('disconnect', onDisconnected.bind(this))
        client.on('CLIENT_ADD_FRIEND', onAddFriend.bind(this))
        client.on('CLIENT_ACCEPT_FRIEND_REQUEST', onAcceptFriendRequest.bind(this))
        client.on('CLIENT_DECLINE_FRIEND_REQUEST', onDeclineFriendRequest.bind(this))

        function onDisconnected() {
            this.db.disconnectUser(client)
        }

        function onAuthTry(user) {
            this.db.tryAuthenticate(user)
        }

        function onAddFriend(data) {
            this.db.addFriend(data, client)
        }

        function onAcceptFriendRequest(data) {
            console.log(data)
            this.db.acceptFriendRequest(data, client)
        }

        function onDeclineFriendRequest(data) {
            this.db.declineFriendRequest(data, client)
        }

    }
}

module.exports = ClientManager