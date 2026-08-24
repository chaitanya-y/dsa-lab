class Queue{
  constructor(){
    this.items = [];
  }

  enqueue(value){
    this.items.push(value);
  }

  dequeue(){
    return this.items.shift()
  }

  isEmpty(){
    return console.log(this.items.length === 0)
  }

  peek(){
    if(!this.isEmpty()){
      return this.items[0]
    }
  }

  size(){
    return console.log(this.items.length)
  }

  print(){
    return console.log(this.items)
  }
}

let queue = new Queue();
queue.enqueue(1)
queue.enqueue(987)
queue.enqueue(100)
queue.print()
queue.dequeue()
queue.print()
queue.isEmpty()
queue.size()
console.log(queue.peek())


