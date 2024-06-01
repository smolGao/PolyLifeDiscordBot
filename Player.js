class Player {
    constructor () {
        this.name;
        this.account;
        this.inventory;
        this.property;


        // Place holder 
        this.ability;
        this.effect;
    }

    buyProperty(land) {
        this.account -= land.value;
        this.property.push(property);
        land.ownder = this.name;
    }
}