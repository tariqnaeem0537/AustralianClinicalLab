// Test game, from challenge instructions

var http = require("http");
var Game  = require('./Game.js');

http.createServer(function (request, response) {
    response.writeHead(200, {'Content-Type': 'text/plain'});

    let game = new Game('p1', 'p2');
        
        response.write('We have 2 players P1 & p2' + '\n');
        //returns 0-0
        response.write('Initial Score: ' + game.getScore() + '\n');

        game.pointWonBy("p1");
        game.pointWonBy("p2");
        //returns 15-15
        response.write(game.getScore() + '\n');

        game.pointWonBy("p1");
        game.pointWonBy("p1");
        //return 40-15
        response.write(game.getScore() + '\n');

        game.pointWonBy("p2");
        game.pointWonBy("p2");
        //returns Deuce
        response.write(game.getScore() + '\n');

        game.pointWonBy("p1");
        //return "Advantage player 1"
        response.write(game.getScore() + '\n');

        game.pointWonBy("p1");
        //return "P1 wins"
        response.end(game.getScore());

 }).listen(8081);




