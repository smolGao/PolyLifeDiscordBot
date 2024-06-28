class Bank {
    constructor() {
        this.money = Infinity; 
        this.properties = []; 
    }

    transferProperty(property, buyer) {
        if (property.owner !== null) {
            throw new Error('Property already owned');
        }
        buyer.adjustMoney(-property.cost);
        buyer.properties.push(property);
        property.owner = buyer;
    }

    receiveProperty(property) {
        property.owner = null;
        this.properties.push(property);
    }
}

export default Bank;
