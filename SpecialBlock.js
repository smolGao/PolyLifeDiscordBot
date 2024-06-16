class SpecialBlock {
    constructor(name) {
        this.name = name;
    }

    action(player) {
        console.log(`${player.name} landed on ${this.name}`);
    }

    toString() {
        return `${this.name}`;
    }
}

export default SpecialBlock;