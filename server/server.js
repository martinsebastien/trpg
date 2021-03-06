let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

io.on('connection', (socket) => {
    console.log('user connected');

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });

    socket.on('new message', (msg) => {
        var data = {
            message: msg.message,
            username: msg.username,
            date: Date.now()
        };
        io.emit('chat message', data);
    });
});

http.listen(3000, () => {
    console.log('started on port 3000');
});
