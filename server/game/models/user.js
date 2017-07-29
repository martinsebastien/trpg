class User {
    constructor(data) {
        this.pseudo = data.name
        this.password = data.password
        this.role = data.role
    }
}

module.exports = User
