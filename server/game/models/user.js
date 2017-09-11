class User {
    constructor(data, r, connection) {
        this.user = {}
        this.user.id = data.id
        this.user.pseudo= data.pseudo
        this.user.username = data.username
        this.user.role = data.role
        this.user.token = data.token
        this.user.online = data.online
        this.user.friendsList = data.friendsList

        this.r = r
        this.connection = connection
        this.updateUser()
    }

    getPseudo() {
        return this.pseudo
    }

    getFriendsList() {
        return this.friendsList
    }

    updateUser() {
        let self = this
        this.r.table('users').get(self.user.id).changes().run(self.connection, function(err, cursor){
            cursor.each(console.log)
        })
    }

}

module.exports = User
