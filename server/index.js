var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

const gamestate = {
    players: {}
}

class Player {
    constructor(position, name, speed = 3, str = 5, def = 0, health = 100) {
        this.position = position;
        this.name = name;
        this.speed = speed;
        this.str = str;
        this.def = def;
        this.health = health;
        this.maxspeed = speed;
        this.maxstr = str;
        this.maxdef = def;
        this.maxhealth = health;
        this.coins = 0;
    }
}

var dim = [1920, 907];
var startLocations = [[100, 100], [100, 780], [1700, 100], [1700, 780]];

io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('disconnect', function () {
        console.log('user disconnected');
        socket.broadcast.emit('remplayer', socket.id);
        delete gamestate.players[socket.id]
    });
    socket.on('startup', function (e) {
        keys = Object.keys(gamestate.players);
        gamestate.players[socket.id] = new Player(startLocations[keys.length], e);
        socket.broadcast.emit('newplayer', socket.id + ' ' + gamestate.players[socket.id].position);
        for (const key of keys) {
            socket.emit('newplayer', key + ' ' + gamestate.players[key].position)
        }
        socket.emit('loc', startLocations[keys.length])
        if (keys.length == 1) {
            io.emit('gamestart');
            for (var i = 0; i < 20; i++) {
                io.emit('block', [[Math.random() * dim[0], Math.random() * dim[1]]])
            }
            console.log('Game started');
        }
    });
    socket.on('loc', function (e) {
        gamestate.players[socket.id].position = e;
        socket.broadcast.emit('oloc', socket.id + ' ' + gamestate.players[socket.id].position)
    });
    socket.on('bul', function (e) {
        gamestate.players[socket.id].position = e;
        socket.broadcast.emit('obulID', socket.id);
        socket.broadcast.emit('obulData', e);
    });
    socket.on('stats', function(e){
        var player = gamestate.players[socket.id];
        player.maxhealth = e[0][0];
        player.health = e[0][1];
        player.maxdef = e[1][0];
        player.def = e[1][1];
        player.maxspeed = e[2][0];
        player.speed = e[2][1];
        player.maxstr = e[3][0];
        player.str = e[3][1];
        player.coins = e[4]
        socket.broadcast.emit('obulID', socket.id);
        socket.broadcast.emit('stats', e);
    })

});

http.listen(3000, function () {
    console.log('listening on *:3000');
});