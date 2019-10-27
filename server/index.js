var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

var gamestates = [];

class GameState {
    constructor(){
        this.players = [];
        this.socket_id = [];
    }
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

io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('disconnect', function () {
        console.log('user disconnected');
        socket.broadcast.emit('remplayer', socket.id);
        var gamestate = gamestates.find(x=>x.players[socket.id] instanceof Player);
        if(gamestate != undefined){
            delete gamestate.players[socket.id]
            gamestate.socket_id = gamestate.socket_id.filter(x => x != socket.id);
        }

    });
    socket.on('startup', function (e) {
        var gamestate = gamestates.find(x => Object.keys(x.players).length < 2);
        if(!gamestate){
            gamestate = new GameState();
            gamestates.push(gamestate);
        }
        gamestate.players[socket.id] = new Player([(Math.random() * 1600) + 100, (Math.random() * 680) + 100], e);
        gamestate.socket_id.push(socket.id);
        var opponent = gamestate.socket_id.filter(x => x != socket.id);
        if(opponent){
            io.to(opponent).emit('newplayer', socket.id + ' ' + gamestate.players[socket.id].position)
        }
        keys = Object.keys(gamestate.players);
        for (const key of keys) {
            if(key != socket.id)
                socket.emit('newplayer', key + ' ' + gamestate.players[key].position)
        }
        socket.emit('loc', gamestate.players[socket.id].position)
        if (keys.length == 2) {
            io.emit('gamestart');
            for (var i = 0; i < 20; i++) {
                io.emit('block', [[Math.random() * dim[0], Math.random() * dim[1]]])
            }
            console.log('Game started');
        }
    });
    socket.on('loc', function (e) {
        var gamestate = gamestates.find(x=>x.players[socket.id] instanceof Player);
        var opponent = gamestate.socket_id.filter(x => x != socket.id);
        gamestate.players[socket.id].position = e;
        io.to(opponent).emit('oloc', socket.id + ' ' + gamestate.players[socket.id].position)
    });
    socket.on('bul', function (e) {
        var gamestate = gamestates.find(x=>x.players[socket.id] instanceof Player);
        var opponent = gamestate.socket_id.filter(x => x != socket.id);
        gamestate.players[socket.id].position = e;
        io.to(opponent).emit('obulID', socket.id);
        io.to(opponent).emit('obulData', e);
    });
    socket.on('stats', function(e){
        var gamestate = gamestates.find(x=>x.players[socket.id] instanceof Player);
        var opponent = gamestate.socket_id.filter(x => x != socket.id);
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
        io.to(opponent).emit('obulID', socket.id);
        io.to(opponent).emit('stats', e);
    })

});

http.listen(3000, function () {
    console.log('listening on *:3000');
});