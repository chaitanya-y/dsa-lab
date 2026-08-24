//Last In First Out
class Stack{

constructor(){
  this.items = [];
}

  push(value){
    this.items.push(value)
  }

  pop(){
    
    return console.log(this.items.pop())
  }

  peek(){
    return console.log(this.items[this.items.length - 1])
  }

  isEmpty(){
    return console.log(this.items.length === 0)
  }

  size(){
    return console.log(this.items.length)
  }

  print(){
    return console.log(this.items.join(','))
  }
  
}

let stack = new Stack();

stack.push(5)
stack.push(50)
stack.push(5909)
stack.print()
stack.pop()
stack.print()
stack.isEmpty()
stack.peek()
stack.size()
