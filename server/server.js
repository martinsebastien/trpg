let app = require('express')()
let http = require('http').Server(app)
let io = require('socket.io')(http)
let r = require('rethinkdbdash')({
    db: 'trpg'
})
let DataBase = require('./game/models/db') 
let GameServer = require('./game/gameServer')

let db = new DataBase(r, io)

let gameServer = new GameServer(io, db)
gameServer.start()

http.listen(3000, () => {
    console.log('started on port 3000')
})
