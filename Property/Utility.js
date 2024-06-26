import Property from './property';

class Utility extends Property {
    constructor(name) {
        super(name, 150, 0); // Cost is set to 150, initial rent is set to 0
    }

    getRent(roll) {
        const numOwned = this.owner.properties.filter(prop => prop instanceof Utility).length;
        return numOwned === 1 ? roll * 4 : roll * 10;
    }

    payRent(player, roll) {
        if (this.owner === null) {
            throw new Error('Utility is not owned by anyone');
        }
        const rent = this.getRent(roll);
        if (player.money < rent) {
            throw new Error(`${player.name} cannot afford the rent`);
        }
        player.adjustMoney(-rent);
        this.owner.adjustMoney(rent);
    }

    toString() {
        return `${this.name} - Cost: $${this.cost}, Rent: Variable, Owner: ${this.owner ? this.owner.name : 'None'}, Mortgaged: ${this.mortgaged}`;
    }
}

export default Utility;
