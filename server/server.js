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

io.on('connection', (socket) => {
    console.log('user connected')

    socket.on('disconnect', function () {
        console.log('user disconnected')
    })

    socket.on('new message', (msg) => {
        var data = {
            message: msg.message,
            username: msg.username,
            date: Date.now()
        }
        io.emit('chat message', data)
    })
})


http.listen(3000, () => {
    console.log('started on port 3000')
})
