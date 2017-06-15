var express = require('express')
var app = express()

var server = require('http').Server(app);
var io = require('socket.io')(server);

io.on('connection', function (socket) {
    socket.emit('connected', { status: 'OK' });
});

app.use(express.static('frontend'))

var ships = [5, 4, 3, 3, 2];
var directions = ['l', 'r', 'u', 'd'];
var boardSize = 10;
var battlefield = [
    [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ],
    [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ],
    [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ],
    [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ],
    [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ],
    [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ],
    [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ],
    [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ],
    [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ],
    [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ] ];

var bodyParser = require( './node_modules/body-parser' );

app.use(bodyParser.json());

server.listen(3000, function () {
  console.log('Example app listening on port 3000!');
})
// respond with "hello world" when a GET request is made to the homepage
app.get('/start_game', function (req, res) {
    for(var i = 0; i < 5; i++)
    {
        var fitsIn = false;
        var point = {};
        var index = 0;

        do {
            point.x = getRandomInt();
            point.y = getRandomInt();

            for(index = 0; index < 4; index++) {
                fitsIn = checkIfFitsIn(point, directions[index], ships[i]);
                if(fitsIn) break;
            }
        } while(!fitsIn)

        placeTheShip(point, directions[index], ships[i]);
    }

    var response = {
        grid: battlefield
    }

    io.emit('started', {
        grid: battlefield
    })

    res.send(`${JSON.stringify(response)}`);
})

app.post('/next_turn', (req, res) => {
  res.send(`POST /next_turn. JSON: ${JSON.stringify(req.body)}`);
})

app.post('/end_game', (req, res) => {
  res.send(`POST /end_game. JSON: ${JSON.stringify(req.body)}`);
})


MISS = 'o'
HIT = 'x'
SUNK = 's'

const enemyBoard = new Array(10).fill(new Array(10))
const ourBoard = new Array(10).fill(new Array(10))

const updateOurBoard = (x, y) => {
  
}

function clean() {
    battlefield = [
        [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ],
        [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ],
        [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ],
        [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ],
        [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ],
        [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ],
        [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ],
        [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ],
        [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ],
        [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ] ];
}

function checkIfFitsIn(point, direction, ship) {
    switch(direction)
    {
        case "l":
            if(point.x - ship < 0)
                return false;

            for(var i = point.x - ship; i < point.x; i++)
            {
                if (battlefield[point.y][i] != ' ')
                    return false;
            }

            return true;
        case "r":
            if(point.x + ship >= boardSize)
                return false;

            for(var i = point.x; i < point.x + ship; i++)
            {
                if (battlefield[point.y][i] != ' ')
                    return false;
            }

            return true;
        case "u":
            if(point.y - ship < 0)
                return false;

            for(var i = point.y - ship; i < point.y; i++)
            {
                if (battlefield[i][point.x] != ' ')
                    return false;
            }

            return true;
        case "d":
            if(point.y + ship >= boardSize)
                return false;

            for(var i = point.y; i < point.y + ship; i++)
            {
                if (battlefield[i][point.x] != ' ')
                    return false;
            }

            return true;
    }
}

function placeTheShip(point, direction, ship) {
    switch(direction)
    {
        case "l":
            for(var i = point.x - ship; i < point.x; i++) {
                battlefield[point.y][i] = ship;
            }
            break;
        case "r":
            for(var i = point.x; i < point.x + ship; i++) {
                battlefield[point.y][i] = ship;
            }
            break;
        case "u":
            for(var i = point.y - ship; i < point.y; i++) {
                battlefield[i][point.x] = ship;
            }
            break;
        case "d":
            for(var i = point.y; i < point.y + ship; i++) {
                battlefield[i][point.x] = ship;
            }
            break;
    }
}

/*
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
*/
function getRandomInt(min, max) {
    return Math.floor(Math.random() * boardSize);
}

