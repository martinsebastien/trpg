let User = require('./user');

class DataBase {
    constructor(r, io) {
        this.r = r
        this.io = io
    }

    // Handfull methods

    // QUERIES
    // Update a row
    async updateEntry(table, id, field, value) {
        let updateField = {}
        updateField[field] = value

        await this.r.table(table)
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

        await this.r.table(table).get(id)
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
        let me = data.me
        let friendName = data.pseudo
        let user = await this.r.table('users').get(me.id)


        let friendRaw = await this.r.table('users')
            .filter({
                pseudo: friendName
            })
            .run()
        let friend = friendRaw[0]

        let isMe = me.pseudo === friendName
        let isAlreadyFriend = user.friendList.includes(friend.id)

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
        if (!!friendRaw.length) {
            await this.appendData('users', me.id, 'friendList', friend.id)
            let friendList = await this.buildFriendList(me.id)

            this.io.to(client.id).emit('SERVER_SUCCESS_ADD_FRIEND', friendList)
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
            status: 'offline',
            friendList: []
        }).run()
    }

    async buildFriendList(id) {
        let me = await this.getEntry('users', id)
        let friendList = []

        for (let friendId of me.friendList) {
            let friendRaw = await this.getEntry('users', friendId)
            let friend = {}
            friend['id'] = friendRaw.id
            friend['pseudo'] = friendRaw.pseudo
            friend['status'] = friendRaw.status

            await friendList.push(friend)
        }

        return friendList
    }

    async buildUser(id) {
        let me = await this.getEntry('users', id)
        let user = {}

        user['id'] = me.id
        user['pseudo'] = me.pseudo
        user['role'] = me.role
        user['online'] = me.online
        user['token'] = me.token
        user['friendList'] = me.friendList
        user['status'] = me.status

        return user
    }

    //Set a user disconnected
    async disconnectUser(client) {
        let user = await this.r.table('users')
            .filter({
                token: client.id
            })
            .run()

        if (!!user.length) {
            let thisUser = user[0]
            await this.updateEntry('users', thisUser.id, 'online', false)
            await this.updateEntry('users', thisUser.id, 'status', 'offline')
        }
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
            let userRaw = userArray[0]
            let user = await this.buildUser(userRaw.id)

            if (user.online == true) {
                this.io.to(user.token).emit('SERVER_DISCONNECT_CLIENT')
                await this.updateEntry('users', user.id, 'token', client.token)
            } else {
                await this.updateEntry('users', user.id, 'token', client.token)
                await this.updateEntry('users', user.id, 'online', true)
                await this.updateEntry('users', user.id, 'status', 'online')
            }

            let friendList = await this.buildFriendList(user.id)
            user.friendList = friendList

            this.io.to(client.token).emit('SERVER_SUCCESS_LOGIN', user)
        } else {
            this.io.to(client.token).emit('SERVER_FAIL_LOGIN')
        }
    }

}

module.exports = DataBase


