class Map { 
    constructor() {
        this.head = null;
        this.tail = null;
    }

    add(name) {
        const newLand = new Land(name);
        if (!this.head) {
            this.head = newLand;
            this.tail = newLand;
            newLand.next = this.head;  // Point to itself, creating a circular reference
        } else {
            this.tail.next = newLand;
            this.tail = newLand;
            this.tail.next = this.head;  // Ensure the tail points back to the head
        }
    }

    remove(name) {
        if (!this.head) return;

        let current = this.head;
        let previous = null;
        
        do {
            if (current.name === name) {
                if (current === this.head) {
                    this.head = this.head.next;
                    this.tail.next = this.head;
                } else if (current === this.tail) {
                    this.tail = previous;
                    this.tail.next = this.head;
                } else {
                    previous.next = current.next;
                }
                return;
            }
            previous = current;
            current = current.next;
        } while (current !== this.head);
    }

    display() {
        if (!this.head) return;

        let current = this.head;
        let result = [];
        
        do {
            result.push(current.name);
            current = current.next;
        } while (current !== this.head);
        
        console.log(result.join(" -> ") + " -> (head)");
    }
}


class Land {
    constructor (name) {
        this.name;
        this.price;
        this.tax;
        this.house;
        this.event;
        this.owner;
        this.mortgage;

        // Linked list attributes
        this.prev;
        this.next;
        
    }   
}