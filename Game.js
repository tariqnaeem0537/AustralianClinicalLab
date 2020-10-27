var Player  = require('./Player');
var Score  = require('./Score');

class Game {

    constructor(p1, p2) {
        // Initialize a new game with the players
        this.p1 = new Player(p1);
        this.p2 = new Player(p2);
    }

    getScore() {

        // Check if there is already a winner
        if(this.winner == this.p1) {
            return this.p1.name + ' wins';
        }
        else if(this.winner == this.p2) {
            return this.p2.name + ' wins';
        }

        // If there is no winner, check the score.

        let score1 = this.p1.score;
        let score2 = this.p2.score;

        // If both players are at or above 3 points, the score is described based on the difference between player scores
        if(score1 > 3 || score2 > 3) {
            let difference = score1 - score2;
            if(difference == 0) return 'Deuce';
            else if(difference == 1) return 'Advantage ' + this.p1.name;
            else if(difference == -1) return 'Advantage ' + this.p2.name;
            else if(difference >= 2) {
                this.winner = this.p1;
                return this.p1.name + ' wins';
            }
            else if(difference <= -2) {
                this.winner = this.p2;
                return this.p2.name + ' wins';
            }
        }

        if(score1 == 3 && score2 == 3) {
            return 'Deuce';
        }


        // One or more players are below 3 points, so we revert to numerical tennis scoring
        score1 = Score.get(score1);
        score2 = Score.get(score2);
        return (score1 + '-' + score2);

    }

    pointWonBy(player) {
        // Increment appropriate player's score
        if(player == this.p1.name) {
            this.p1.addPoint();
        } else if(player == this.p2.name) {
            this.p2.addPoint();
        } else {
            // Error handling for input not required as per instructions
        }
    }
}

module.exports = Game;