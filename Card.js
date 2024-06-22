class Card {
    constructor(description, action) {
        this.description = description;
        this.action = action; 
    }

    execute(player) {
        this.action(player);
    }

    toString() {
        return this.description;
    }
}

export default Card;
