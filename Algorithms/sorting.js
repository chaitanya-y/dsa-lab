
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


