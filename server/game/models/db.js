let User = require('./user');

class DataBase {
    constructor(r, io) {
        this.r = r
        this.io = io
    }

    // Handfull methods

    // QUERIES
    // Update a row
    updateEntry(table, id, field, value) {
        let updateField = {}
        updateField[field] = value

        this.r.table(table)
            .get(id)
            .update(updateField)
            .run()
    }

    //Push a data in an array of a row
    async appendData(table, id, field, value) {
        let object = await this.r.table(table).get(id).run()

        let updateField = {}
        updateField[field] = object[field]
        updateField[field].push(value)

        this.r.table(table).get(id)
            .update(updateField)
            .run()
    }

    // Return a given entry
    async getEntry(table, id) {
        return await this.r.table(table)
            .get(id)
            .run()
    }

    // Add a friend for a given user
    async addFriend(data, client) {
        console.log(client.id)
        let me = data.me
        let friendName = data.pseudo
        let user = await this.r.table('users').get(me.id)

        let isMe = me.pseudo === friendName
        let isAlreadyFriend = user.friendList.includes(friendName)

        let friend = await this.r.table('users')
            .filter({
                pseudo: friendName
            })
            .run()

        //Can't add himself as friend
        if (isMe) {
            this.io.to(client.id).emit('SERVER_FAIL_ADD_FRIEND_IS_ME')
            return
        }
        //Is already in friend list
        if (isAlreadyFriend) {
            this.io.to(client.id).emit('SERVER_FAIL_ADD_FRIEND_ALREADY_FRIEND')
            return
        }
        //That pseudo exist
        if (!!friend.length) {
            await this.appendData('users', me.id, 'friendList', friendName)
            let updatedUser = await this.r.table('users').get(me.id)

            this.io.to(client.id).emit('SERVER_SUCCESS_ADD_FRIEND', updatedUser)
        } else {
            this.io.to(client.id).emit('SERVER_FAIL_ADD_FRIEND_DOES_NOT_EXIST')
        }
    }

    // USER MATTERS
    //Create a boilerplate user
    createUser(user) {
        this.r.table('users').insert({
            username: user.username,
            pseudo: user.pseudo,
            password: user.password,
            role: 'player',
            online: false,
            token: 'xxx',
            friendList: []
        }).run()
    }

    //Set a user disconnected
    async disconnectUser(client) {
        let user = await this.r.table('users')
            .filter({
                token: client.id
            })
            .run()

        !!user.length && this.updateEntry('users', user.id, 'online', false)
    }

    //Try authenticate a user
    async tryAuthenticate(client, currentUser) {
        if (!client.username || !client.password) {
            this.io.emit('SERVER_FAIL_LOGIN')
            return
        }

        let userArray = await this.r.table('users')
            .filter({
                username: client.username,
                password: client.password
            })
            .run()

        if (!!userArray.length) {
            let user = userArray[0]
            delete user.password

            if (user.online == true) {
                this.io.to(user.token).emit('SERVER_DISCONNECT_CLIENT')
                this.updateEntry('users', user.id, 'token', client.token)
            } else {
                this.updateEntry('users', user.id, 'token', client.token)
                this.updateEntry('users', user.id, 'online', true)
            }
            this.io.to(client.token).emit('SERVER_SUCCESS_LOGIN', user)
        } else {
            this.io.to(client.token).emit('SERVER_FAIL_LOGIN')
        }
    }

}

module.exports = DataBase


