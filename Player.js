class Player {

    constructor(name) {
        this.score = 0;
        this.name = name;
    }

    addPoint() {
        this.score++;
    }
    
}
module.exports = Player;