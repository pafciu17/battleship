var express = require('express');
var app = express();

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

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
})
// respond with "hello world" when a GET request is made to the homepage
app.get('/start_game', function (req, res) {
    clean();

    for(var i = 0; i < 5; i++)
    {
        var fitsIn = false;
        var point = {};
        var index = 0;

        do {
            point.x = getRandomInt();
            point.y = getRandomInt();

            console.log(point);

            for(index = 0; index < 4; index++) {
                fitsIn = checkIfFitsIn(point, directions[index], ships[i]);
                if(fitsIn) break;
            }
        } while(!fitsIn)

        placeTheShip(point, directions[index], ships[i], "" + (i+1));
    }

    sendBattlefield(res);
})

app.post('/next_turn', (req, res) => {
    json = req.body;
    updateBoard(json.report);
    shoot(res);
})

app.post('/end_game', (req, res) => {
  res.send(`POST /end_game. JSON: ${JSON.stringify(req.body)}`)
});

// ”MISS” || ”HIT” || ”SUNK”
MISS = 'MISS';
HIT = 'HIT';
SUNK = 'SUNK';

const enemyBoard = Array(10).fill(null).map(x => Array(10).fill(null));

const updateBoards = (report) => {
    battlefield[parseInt(report.enemy.target.y)][parseInt(report.enemy.target.x)] = report.enemy.event;
    enemyBoard[parseInt(report.you.target.y)][parseInt(report.you.target.x)] = report.you.event;
}

const shoot = (res) => {
    var x = Math.floor(Math.random() * 10);
    var y = Math.floor(Math.random() * 10);
    console.log(x, y, enemyBoard);
    while(enemyBoard[y][x]) {
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);
    }
    res.send([x, y]);
}

function sendBattlefield(res){
    var response = {
        grid: battlefield
    };

    res.send(`${JSON.stringify(response)}`);
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

function placeTheShip(point, direction, shipSize, ship) {
    switch(direction)
    {
        case "l":
            for(var i = point.x - shipSize; i < point.x; i++) {
                battlefield[point.y][i] = ship;
            }
            break;
        case "r":
            for(var i = point.x; i < point.x + shipSize; i++) {
                battlefield[point.y][i] = ship;
            }
            break;
        case "u":
            for(var i = point.y - shipSize; i < point.y; i++) {
                battlefield[i][point.x] = ship;
            }
            break;
        case "d":
            for(var i = point.y; i < point.y + shipSize; i++) {
                battlefield[i][point.x] = ship;
            }
            break;
    }
}

/*
MDN:
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
*/
function getRandomInt(min, max) {
    return Math.floor(Math.random() * boardSize);
}