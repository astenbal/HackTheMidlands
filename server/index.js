var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

const gamestate ={
    players: {}
}

class Player{
    constructor(position, name, speed = 3, str = 5, def = 0, health = 100){
        this.position = position;
        this.name = name;
        this.speed = speed;
        this.str = str;
        this.def = def;
        this.health = health;
    }
}

var startLocations = [[100, 100], [100, 500], [1000, 100], [1000, 500]]

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
    socket.broadcast.emit('remplayer', socket.id);
    delete gamestate.players[socket.id]
  });
  socket.on('startup', function(e){
        keys = Object.keys(gamestate.players);
        gamestate.players[socket.id] = new Player(startLocations[keys.length], e);
        socket.broadcast.emit('newplayer', socket.id + ' ' + gamestate.players[socket.id].position);
        for(const key of keys){
            socket.emit('newplayer', key +  ' ' + gamestate.players[key].position)
        }
        socket.emit('loc', startLocations[keys.length])
        console.log(gamestate.players[socket.id].position);
        console.log(keys.length);
        if(keys.length == 1){
            io.emit('gamestart');
            console.log('Game started');
        }
  });
  socket.on('loc', function(e){
      gamestate.players[socket.id].position = e;
      socket.broadcast.emit('oloc', socket.id + ' ' + gamestate.players[socket.id].position)
  })
  socket.on('bul', function(e){
    gamestate.players[socket.id].position = e;
    socket.broadcast.emit('obulID', socket.id);
    socket.broadcast.emit('obulData', e);
})
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});