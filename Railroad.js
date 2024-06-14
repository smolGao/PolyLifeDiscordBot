import Property from './property';

class Railroad extends Property {
    constructor(name) {
        super(name, 200, 0); // Initial rent is set to 0, we'll calculate rent based on the number of railroads owned
    }

    getRent() {
        const rents = [25, 50, 100, 200];
        const numOwned = this.owner.properties.filter(prop => prop instanceof Railroad).length;
        return rents[numOwned - 1];
    }

    payRent(player) {
        if (this.owner === null) {
            throw new Error('Railroad is not owned by anyone');
        }
        const rent = this.getRent();
        if (player.money < rent) {
            throw new Error(`${player.name} cannot afford the rent`);
        }
        player.adjustMoney(-rent);
        this.owner.adjustMoney(rent);
    }

    toString() {
        return `${this.name} - Cost: $${this.cost}, Rent: $${this.getRent()}, Owner: ${this.owner ? this.owner.name : 'None'}, Mortgaged: ${this.mortgaged}`;
    }
}

export default Railroad;
