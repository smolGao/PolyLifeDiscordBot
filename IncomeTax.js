import SpecialBlock from './SpecialBlock';

class IncomeTax extends SpecialBlock {
    constructor() {
        super('Income Tax');
    }

    action(player) {
        super.action(player);
        player.adjustMoney(-200); 
    }
}

export default IncomeTax;
