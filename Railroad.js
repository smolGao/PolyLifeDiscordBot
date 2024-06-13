class Railroad {
    constructor(name, cost) {
        this.name = name;
        this.cost = cost;
        this.owner = null;
        this.mortgaged = false;
    }

    getRent(numOwned) {
        const rents = [25, 50, 100, 200];
        return rents[numOwned - 1];
    }

    purchase(player) {
        if (this.owner !== null) {
            throw new Error('Railroad is already owned');
        }
        this.owner = player;
        player.adjustMoney(-this.cost);
        player.properties.push(this);
    }

    payRent(player) {
        if (this.owner === null) {
            throw new Error('Railroad is not owned by anyone');
        }
        const numOwned = this.owner.properties.filter(prop => prop instanceof Railroad).length;
        const rent = this.getRent(numOwned);
        if (player.money < rent) {
            throw new Error(`${player.name} cannot afford the rent`);
        }
        player.adjustMoney(-rent);
        this.owner.adjustMoney(rent);
    }

    mortgage() {
        if (this.mortgaged) {
            throw new Error('Railroad is already mortgaged');
        }
        this.mortgaged = true;
        this.owner.adjustMoney(this.cost / 2);
    }

    liftMortgage() {
        if (!this.mortgaged) {
            throw new Error('Railroad is not mortgaged');
        }
        const mortgageLiftCost = this.cost / 2 * 1.1;
        if (this.owner.money < mortgageLiftCost) {
            throw new Error(`${this.owner.name} cannot afford to lift the mortgage`);
        }
        this.owner.adjustMoney(-mortgageLiftCost);
        this.mortgaged = false;
    }

    toString() {
        return `${this.name} - Cost: $${this.cost}, Owner: ${this.owner ? this.owner.name : 'None'}, Mortgaged: ${this.mortgaged}`;
    }
}

export default Railroad;
