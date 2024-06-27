class Deck {
    constructor(cards) {
        this.cards = cards;
        this.shuffle();
    }

    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    draw() {
        if (this.cards.length === 0) {
            throw new Error('The deck is empty');
        }
        return this.cards.pop();
    }

    addCard(card) {
        this.cards.push(card);
        this.shuffle();
    }
}

export default Deck;
