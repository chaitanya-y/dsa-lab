class Stack{
constructor(){
  this.items = {}
  this.index = 0
}
  push(value){
    this.items[this.index] = value;
    this.index++;
  }

  pop(){
     delete this.items[this.index-1];
    this.index--;
  }

  peek(){
    return console.log(this.items[this.index-1]);
  }

  isEmpty(){
    return console.log(this.index === 0);
  }

  size(){
    return console.log(this.index);
  }

  print(){
    return console.log(this.items)
  }
}

let stack = new Stack();
stack.push(1)
stack.push(13)
stack.push(109)
stack.print()
stack.pop()
stack.pop()
stack.print()
stack.isEmpty()
stack.size()
stack.peek()