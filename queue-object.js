class Queue{
  constructor(){
    this.items = {};
    this.front = 0;
    this.rear = 0;
  }

  enqueue(value){
    this.items[this.rear] = value;
    this.rear++;
  }

  dequeue(){
    let item = this.items[this.front];
    delete this.items[this.front];
    this.front++;
    return console.log(item);
  }

  peek(){
    return console.log(this.items[this.front]);
  }

  isEmpty(){
    return console.log(this.rear-this.front === 0)
  }

  size(){
    return console.log(this.rear-this.front)
  }

  print(){
    return console.log(this.items);
  }
}

let queue = new Queue();
queue.enqueue(1)
queue.enqueue(100)
queue.enqueue(2)
queue.print()
queue.dequeue()
queue.print()
queue.isEmpty()
queue.size()
queue.peek()
