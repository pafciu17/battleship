var express = require('express')
var app = express()

// respond with "hello world" when a GET request is made to the homepage
app.get('/start_game', function (req, res) {
    res.send('hello world')
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})

MISS = 'o'
HIT = 'x'
SUNK = 's'

const enemyBoard = Array(10).fill(Array(10))
const ourBoard = Array(10).fill(Array(10))
