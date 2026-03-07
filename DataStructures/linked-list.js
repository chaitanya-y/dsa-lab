class Node{
  constructor(value){
    this.value = value;
    this.next = null
  }
}

class LinkedList{
  
  constructor(){
    this.head = null;
    this.size =0;
  }

  isEmpty(){
    return this.size === 0;
  }

  getSize(){
    return this.size;
  }

  prepend(value){
    let node = new Node(value);
    if(this.isEmpty()){
      this.head = node;
    }else{
      node.next = this.head;
      this.head = node;
    }
    this.size++;
  }

  append(value){
    let node = new Node(value);
    if(this.isEmpty()){
      this.head = node
    }else{
      let curr = this.head;
      while(curr.next){
        curr = curr.next;
      }
      curr.next = node;
    }
    this.size++;
  }

  insertNode(value,index){
    if(index < 0 && index > this.size){
      return
    }
    
    if(index === 0){
      this.prepend(value)
    }else{
      let node = new Node(value);
      let prev = this.head;
      for(let i=0;i<index-1;i++){
        prev = prev.next
      }
      node.next = prev.next;
      prev.next = node;
      this.size++;
    }
  }

  removeFrom(index){
     if(index < 0 && index >= this.size){
      return null;
    }
    if(index === 0){
      this.head = this.head.next;
    }else{
      let prev = this.head;
      for(let i=0;i<index-1;i++){
        prev = prev.next;
      }
      let removedNode = prev.next;
      prev.next = removedNode.next;
    }
    this.size--;
  }

  removeValue(value){
    if(this.isEmpty()){
      return null;
    }
    
    if(this.head.value === value){
      this.head = this.head.next;
    }else{
    let prev = this.head;
      while(prev.next && prev.next.value != value){
        prev = prev.next
      }
      if(prev.next) {
        let removedNode = prev.next;
         prev.next = removedNode.next;
      }
      }
    this.size--;
  }

  search(value){
    if(this.isEmpty()){
      return -1;
    }
    let i=0;
    let curr = this.head;
    while(curr){
      if(curr.value === value){
        return i;
      }
      curr = curr.next
      i++
    }
    return -1;
  }

  reverseList(){
    if(this.isEmpty()){
      return null;
    }
    let prev = null;
    let curr = this.head;
    while(curr){
      let temp = curr.next;
      curr.next = prev;
      prev= curr;
      curr = temp;
    }
    this.head = prev;
  }

  reverseListWithRecursion(node=this.head){
    if(node == null) return null;

    if(node.next == null){
      this.head = node;
      return node;
    }
    let node1 = this.reverseListWithRecursion(node.next);
    node1.next = node;
    node.next = null;
    return node;
  }

    midValue(){
    let slowPointer = this.head;
    let fastPointer = this.head;
    while(fastPointer && fastPointer.next){
      slowPointer = slowPointer.next;
      fastPointer = fastPointer.next.next;
    }
    return slowPointer.value;
  }

    removeMidValue(){
    let slowPointer = this.head;
    let fastPointer = this.head;
      let prev =null;
    while(fastPointer && fastPointer.next){
      slowPointer = slowPointer.next;
      prev = slowPointer;
      fastPointer = fastPointer.next.next;
    }
      prev.next = slowPointer.next;
  }
  

  print(){
    let list = '';
    let curr = this.head;
    while(curr){
      list += curr.value + ' > ';
      curr = curr.next;
    }
    console.log(list);
  }
  
}

const linkedList = new LinkedList();
// console.log(linkedList.isEmpty())
// console.log(linkedList.getSize())

//prepend & append
linkedList.prepend(5);
linkedList.append(100);
linkedList.append(200);
linkedList.append(300);
linkedList.print()

//inserting Node
linkedList.insertNode(1000,1);
linkedList.print()
console.log(linkedList.getSize(),' --size of the list\n')


//removeFrom index
linkedList.removeFrom(2);
linkedList.print()
console.log(linkedList.getSize(),' --size of the list\n')

//removevalue
linkedList.removeValue(100)
linkedList.print()
console.log(linkedList.getSize(),' --size of the list\n')

//search
console.log(linkedList.search(1000))

//reverseList
linkedList.reverseList();
linkedList.print()

//reverseListWithRecursion
linkedList.reverseListWithRecursion();
linkedList.print()

//Print middleValue
console.log(linkedList.midValue());



