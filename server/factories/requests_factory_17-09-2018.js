var r = require('rethinkdb');

r.db('trpg').table('requests').insert(
  {
    from: 'XXX', 
    to: 'YYYY', 
    type: 'friend', 
    status: 'pending'
  })