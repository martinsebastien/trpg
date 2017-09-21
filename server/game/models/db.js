let User = require('./user');

class DataBase {
    constructor(r, io) {
        this.r = r
        this.io = io
    }

    // Handfull methods

    // QUERIES
    // Add an entry to a table
    async createEntry(table, value) {
        await this.r.table(table).insert(value).run()
    }

    // Update a row
    async updateEntry(table, id, field, value) {
        let updateField = {}
        updateField[field] = value

        await this.r.table(table)
            .get(id)
            .update(updateField)
            .run()
    }

    // Delete an entry
    async deleteEntry(table, id) {
        await this.r.table(table)
            .get(id)
            .delete()
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
            let hasAlreadyAFriendRequestFromMe = await this.r.table('requests')
                .filter({
                    to: friend.id,
                    from: me.id
                })
                .run()

            if (!!hasAlreadyAFriendRequestFromMe.length) {
                this.io.to(client.id).emit('SERVER_ALREADY_FRIEND_REQUEST')
            } else {
                let friendRequest = {}
                friendRequest['from'] = me.id
                friendRequest['to'] = friend.id
                friendRequest['type'] = 'friend'
                friendRequest['status'] = 'pending'

                await this.createEntry('requests', friendRequest)

                let friendRequestListRaw = await this.r.table('requests')
                    .filter({
                        to: friend.id
                    })
                    .run()
                let friendRequestList = await this.buildFriendRequestList(friendRequestListRaw)

                this.io.to(friend.token).emit('SERVER_UPDATE_FRIEND_REQUEST', friendRequestList)
            }
        } else {
            this.io.to(client.id).emit('SERVER_FAIL_ADD_FRIEND_DOES_NOT_EXIST')
        }
    }

    async acceptFriendRequest(data, client) {
        let request = await this.getEntry('requests', data)

        await this.appendData('users', request.to, 'friendList', request.from)
        await this.appendData('users', request.from, 'friendList', request.to)

        let toUser = await this.getEntry('users', request.to)
        let fromUser = await this.getEntry('users', request.from)

        let toUserFriendList = await this.buildFriendList(toUser.id)
        let fromUserFriendList = await this.buildFriendList(fromUser.id)

        await this.deleteEntry('requests', request.id)

        let friendRequestListRaw = await this.r.table('requests')
            .filter({
                to: toUser.id
            })
            .run()
        let friendRequestList = await this.buildFriendRequestList(friendRequestListRaw)

        this.io.to(toUser.token).emit('SERVER_SUCCESS_ADD_FRIEND', toUserFriendList)
        this.io.to(fromUser.token).emit('SERVER_SUCCESS_ADD_FRIEND', fromUserFriendList)

        this.io.to(toUser.token).emit('SERVER_UPDATE_FRIEND_REQUEST', friendRequestList)
    }

    async declineFriendRequest(data, client) {

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
            status: 'Offline',
            friendList: []
        }).run()
    }

    async buildFriendList(id) {
        let me = await this.getEntry('users', id)
        let friendList = []

        for (let friendId of me.friendList) {
            let friendRaw = await this.getEntry('users', friendId)
            let friend = await this.buildFriend(friendRaw)

            await friendList.push(friend)
        }

        return friendList
    }

    async buildFriendRequestList(listRaw) {
        for (let friendRequest of listRaw) {
            let friendRaw = await this.getEntry('users', friendRequest.from)
            friendRequest.from = await this.buildFriend(friendRaw)
        }

        return listRaw
    }

    async buildFriend(friendRaw) {
        let friend = {}
        friend['id'] = friendRaw.id
        friend['pseudo'] = friendRaw.pseudo
        friend['status'] = friendRaw.status

        return friend
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
            await this.updateEntry('users', thisUser.id, 'status', 'Offline')

            await this.notifyFriendsOnUpdateStatus(thisUser.id)
        }
    }

    async notifyFriendsOnUpdateStatus(id) {
        let friendList = await this.buildFriendList(id)

        for (let friend of friendList) {
            let thisFriend = await this.getEntry('users', friend.id)
            let thisFriendFriendList = await this.buildFriendList(thisFriend.id)

            this.io.to(thisFriend.token).emit('SERVER_SUCCESS_ADD_FRIEND', thisFriendFriendList)
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
                await this.updateEntry('users', user.id, 'status', 'Online')
            }

            let friendList = await this.buildFriendList(user.id)
            user.friendList = friendList

            let friendRequestListRaw = await this.r.table('requests')
                .filter({
                    to: user.id
                })
                .run()
            let friendRequestList = await this.buildFriendRequestList(friendRequestListRaw)

            this.io.to(client.token).emit('SERVER_SUCCESS_LOGIN', user)
            this.io.to(client.token).emit('SERVER_UPDATE_FRIEND_REQUEST', friendRequestList)
            await this.notifyFriendsOnUpdateStatus(user.id)

        } else {
            this.io.to(client.token).emit('SERVER_FAIL_LOGIN')
        }
    }

}

module.exports = DataBase


