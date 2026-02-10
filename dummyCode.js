middleNumber(){
    let index = 0;
    let curr = this.head;
    while(curr){
    index++;
    curr = curr.next
    }
    // console.log(index)
    let node = this.head;
    for(let i =0;i < index/2 -1;i++){
        node = node.next
    }
    if(index %2 === 0){
     console.log(node.next.value,'odd')
      
    }else{
     console.log(node.value,'odd')
    }
    
  }

// mergesort
function mergeSort(arr){
  if(arr.length < 2){
    return arr;
  }
  let mid = Math.floor(arr.length/2);
  let left = arr.slice(0,mid)
  let right = arr.slice(mid)
  return merge(mergeSort(left), mergeSort(right))
}

function merge(left,right){

  let sortedArray = [];
  while(left.length && right.length){
    if(left[0] <= right[0]){
      sortedArray.push(left.shift())
    }else{
      sortedArray.push(right.shift())
    }
  }
  return [...sortedArray,...left,...right]
}

console.log(mergeSort([-2,4,2,100,34,94]))


//bubbleSort
function bubbleSort(arr){
let swapped;
  do{
    swapped = false;
    for(let i=0;i<arr.length-1;i++){
      if(arr[i] > arr[i+1]){
        let temp = arr[i]
        arr[i] = arr[i+1]
        arr[i+1] = temp;
        swapped = true;
      }
    }
  }while(swapped)
    return arr
}

console.log(bubbleSort([-2,1000,-100,87,87,2,1]))
// O(n^2)


// reverse a linkedList
function reverse(){
  let prev = null;
  let curr = this.head;
  while(curr){
    let next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next
  }
  this.head = prev
  
}

function recursiveReverse(node){
  if(node == null) retur  null
  if(node.next == null){
    this.head = node;
    return node;
  }

  let node1 = recursiveReverse(node.next);
  node1.next = node;
  node.next = null;
  return node;
  
}


