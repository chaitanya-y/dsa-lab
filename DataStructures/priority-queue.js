class PriorityQueu{
constructor(){
  this.collection = [];
}

  enqueue = (element)=>{
    if(this.collection.length === 0){
      this.collection.push(element);
      // return console.log(element)
    }else{
          let added = false;
    for(let i= 0;i<this.collection.length;i++){
      if(element[1] < this.collection[i][1]){
        this.collection.splice(i,0,element);
        added= true
        break;
      }
    }
    if(!added){
      this.collection.push(element)
    }
    }


  }
  print(){
    console.log(this.collection)
  }
}

let pq = new PriorityQueu()
pq.enqueue(['sanjay',1])
pq.enqueue(['chaitanya',5])
pq.enqueue(['swetha',3])
pq.enqueue(['teja',4])
pq.enqueue(['teja',6])
pq.print()