class Player {
    constructor(name) {
        this.name = name;
        this.money = 1500; // Starting money in Monopoly
        this.position = 0; // Starting position on the board (Go)
        this.properties = []; // List of property names or ids owned by the player
        this.inJail = false;
        this.jailTurns = 0; // Counter for turns spent in jail
        this.getOutOfJailFreeCards = 0; // Number of "Get Out of Jail Free" cards
        this.inventory;
        this.ability;

    }

    // Advance the player around the board
    move(steps) {
        this.position = (this.position + steps) % 40; 
        return this.position;
    }

    // Adjust player's money
    adjustMoney(amount) {
        this.money += amount;
    }

    // Buy a property
    buyProperty(property) {
        this.properties.push(property);
        this.adjustMoney(-property.cost);
    }

    // Handle going to jail
    goToJail() {
        this.inJail = true;
        this.position = 10; 
        this.jailTurns = 0;
    }

    // Get out of jail
    getOutOfJail() {
        this.inJail = false;
        this.jailTurns = 0;
    }

    // Use a "Get Out of Jail Free" card
    useGetOutOfJailFreeCard() {
        if (this.getOutOfJailFreeCards > 0) {
            this.getOutOfJailFreeCards -= 1;
            this.getOutOfJail();
        } else {
            throw new Error('No "Get Out of Jail Free" cards available');
        }
    }

    toString() {
        return `${this.name} - Money: $${this.money}, Position: ${this.position}, Properties: [${this.properties.join(', ')}]`;
    }
}

export default Player;
