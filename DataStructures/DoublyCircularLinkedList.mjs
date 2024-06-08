export class CircularLinkedList{
    constructor(){
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    add(node){
        if(size == 0){
            this.head = node;
            this.tail = node;
            this.tail.next = head;
        }else if(size == 1){
            this.head.next = tail;
            this.tail = node;
            this.tail.next = head; 
        }else{
            this.tail.next = node;
            this.tail = node;
            this.tail.next = head;
        }
        this.size++;
    }
}

export class Node{
    constructor(val){
        this.val = val;
        this.next = null;
    }
}