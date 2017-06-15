var express = require('express')
var app = express()

var bodyParser = require( './node_modules/body-parser' );

app.use(bodyParser.json());

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
// respond with "hello world" when a GET request is made to the homepage
app.get('/start_game', function (req, res) {
    res.send('hello world')
})

app.post('/next_turn', (req, res) => {
  res.send(`POST /next_turn. JSON: ${JSON.stringify(req.body)}`)
})

app.post('/end_game', (req, res) => {
  res.send(`POST /end_game. JSON: ${JSON.stringify(req.body)}`)
})


MISS = 'o'
HIT = 'x'
SUNK = 's'

const enemyBoard = new Array(10).fill(new Array(10))
const ourBoard = new Array(10).fill(new Array(10))

const updateOurBoard = (x, y) => {
  
}
