var r = require('rethinkdb');

r.db('trpg').table('users').insert([
  {
    pseudo: "mdr",
    username: "lol",
    password: "lol",
    online: false,
    token: "xxx",
    role: "player",
    friendList: []
  },
  {
    pseudo: "Sebou",
    username: "seb",
    password: "martin",
    online: false,
    token: "xxx",
    role: "player",
    friendList: []
  },
  {
    pseudo: "Ashe",
    username: "sacha",
    password: "ketchup",
    online: false,
    token: "xxx",
    role: "player",
    friendList: []
  }
])