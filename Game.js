class Game {
    constructor(players, board, communityChestDeck, chanceDeck) {
        this.players = players;
        this.board = board;
        this.communityChestDeck = communityChestDeck;
        this.chanceDeck = chanceDeck;
        this.currentPlayerIndex = 0;
        this.bank = new Bank();
    }

    nextTurn() {
        const player = this.players[this.currentPlayerIndex];
        console.log(`${player.name}'s turn`);
        
        const diceRoll = this.rollDice();
        player.move(diceRoll);
        const space = this.board.getSpace(player.position);
        space.action(player);

        if (player.position < diceRoll) {
            player.adjustMoney(200);
        }

        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
    }

    rollDice() {
        return Math.floor(Math.random() * 6) + 1 + Math.floor(Math.random() * 6) + 1;
    }

}

export default Game;
