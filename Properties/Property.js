class Property {
    constructor(name, cost, rent) {
        this.name = name;
        this.cost = cost;
        this.rent = rent;
        this.owner = null; 
        this.mortgaged = false;
    }

    purchase(player) {
        if (this.owner !== null) {
            throw new Error('Property is already owned');
        }
        this.owner = player;
        player.adjustMoney(-this.cost);
        player.properties.push(this);
    }

    payRent(player) {
        if (this.owner === null) {
            throw new Error('Property is not owned by anyone');
        }
        if (player.money < this.rent) {
            throw new Error(`${player.name} cannot afford the rent`);
        }
        player.adjustMoney(-this.rent);
        this.owner.adjustMoney(this.rent);
    }

    mortgage() {
        if (this.mortgaged) {
            throw new Error('Property is already mortgaged');
        }
        this.mortgaged = true;
        this.owner.adjustMoney(this.cost / 2); 
    }

    liftMortgage() {
        if (!this.mortgaged) {
            throw new Error('Property is not mortgaged');
        }
        const mortgageLiftCost = this.cost / 2 * 1.1; 
        if (this.owner.money < mortgageLiftCost) {
            throw new Error(`${this.owner.name} cannot afford to lift the mortgage`);
        }
        this.owner.adjustMoney(-mortgageLiftCost);
        this.mortgaged = false;
    }

    toString() {
        return `${this.name} - Cost: $${this.cost}, Rent: $${this.rent}, Owner: ${this.owner ? this.owner.name : 'None'}, Mortgaged: ${this.mortgaged}`;
    }
}

module.exports = Property;
