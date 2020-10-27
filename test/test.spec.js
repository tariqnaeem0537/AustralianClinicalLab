// Tests for Game class

var assert = require('chai').assert;
var Game  = require('../Game');
var Player  = require('../Player');

describe('Game', () => {

    const p1Name = "p1";
    const p2Name = "p2";
    const game = new Game(p1Name, p2Name);
    const tennisScores = ['0-0', '0-15', '0-30', '15-0', '15-15', 
                            'Deuce', 'Advantage ' + p1Name, 
                            'Advantage ' + p2Name, 
                            p1Name + ' wins', p2Name + ' wins'];

    describe('Score', () => {
        it('should return a valid tennis score', () => {
            assert.oneOf(game.getScore(), tennisScores);
        });

        it('should return 0-0 before any points are added', () => {
            assert.equal(game.getScore(), '0-0');
        });

        // Only a few game cases are included:

        it('should return score of player1-player2 when both scores are below 40 or only one score is 40', () => {
            game.pointWonBy(p1Name);
            assert.equal(game.getScore(), '15-0');
            game.pointWonBy(p2Name);
            game.pointWonBy(p2Name);
            assert.equal(game.getScore(), '15-30');
            game.pointWonBy(p1Name);
            game.pointWonBy(p1Name);
            assert.equal(game.getScore(), '40-30');
        });

        it('should return Deuce when players are tied at or above 40', () => {
            let game = new Game(p1Name, p2Name);
            game.pointWonBy(p1Name);
            game.pointWonBy(p2Name);
            game.pointWonBy(p1Name);
            game.pointWonBy(p2Name);
            game.pointWonBy(p1Name);
            game.pointWonBy(p2Name);
            game.pointWonBy(p1Name);
            game.pointWonBy(p2Name);
            assert.equal(game.getScore(), 'Deuce');
            game.pointWonBy(p1Name);
            game.pointWonBy(p2Name);
            assert.equal(game.getScore(), 'Deuce');
        });

        it('should return Advantage when player has a 1-point lead at or above 40', () => {
            let game = new Game(p1Name, p2Name);
            game.pointWonBy(p1Name);
            game.pointWonBy(p2Name);
            game.pointWonBy(p1Name);
            game.pointWonBy(p2Name);
            game.pointWonBy(p1Name);
            game.pointWonBy(p2Name);
            game.pointWonBy(p1Name);
            assert.equal(game.getScore(), 'Advantage ' + p1Name, 'score is not Advantage at 4-3');
            game.pointWonBy(p2Name);
            game.pointWonBy(p1Name);
            assert.equal(game.getScore(), 'Advantage ' + p1Name, 'score is not Advantage at 5-4');
        });

    });

    describe('pointWonBy', () => {

        it('should add a point to p1 when p1 name is passed', () => {
            let p1Before = game.p1.score;
            game.pointWonBy(p1Name);
            assert.equal(game.p1.score, p1Before + 1, 'point was not added to p1');
        });

        it('should add a point to p2 when p2 name is passed', () => {
            let p2Before = game.p2.score;
            game.pointWonBy(p2Name);
            assert.equal(game.p2.score, p2Before + 1, 'point was not added to p2');
        });

        it('should not change score if wrong name passed', () => {
            let p1Before = game.p1.score;
            let p2Before = game.p2.score;
            game.pointWonBy("wrong name");
            assert.equal(game.p1.score, p1Before, 'p1 scored was changed');
            assert.equal(game.p2.score, p2Before, 'p2 scored was changed');
        });

    });

    describe('Player', () => {

        const playerName = "p1";
        const player = new Player(playerName);
    
        it('should set score to 0', () => {
            assert.isDefined(player.score, 'score is undefined');
            assert.equal(player.score, 0, 'score is not set to zero');
        });
        
        it('should increment points by 1', () => {
            let incrementedPoints = player.score + 1;
                player.addPoint();
                assert.equal(player.score, incrementedPoints, 'does not increment points');
        });
    });
});