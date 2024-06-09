/*
    Only add method is available because currently we do not need to modify the board
*/


export class CircularLinkedList{
    constructor(){
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    add(val){
        if(size == 0){
            var node = new Node(val, node, node);
            this.head = node;
            this.tail = node;
        }else if(size == 1){
            var node = new Node(val, head, head);
            this.tail = node;
            this.head.next = tail;
            this.head.prev = tail;
        }else{
            var node = new Node(val, tail, head);
            this.tail.next = node;  //old tail.next = node
            this.tail = node;
            this.head.prev = tail;  //make head.prev points to new tail
        }
        this.size++;
    }
}

export class Node{
    constructor(val, prev, next){
        this.val = val;
        this.prev = prev;
        this.next = next;
    }
}