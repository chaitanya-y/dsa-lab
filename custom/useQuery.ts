
import { useState, useEffect } from "react";

type AsyncState<T> = 
|{status:"loading"} 
| {status:"success";data:T}
| {status:"error";error:Error}

export default function useQuery<T>(fn:()=> Promise<T>, deps:DependencyList = []) : AsyncState<T> {
const [state,setState] = useState<AsyncState<T>>({status:"loading"});


  useEffect(()=>{
    let ignore = false;

   
  fn().then(function(data){
     if(ignore){
      return
    }
    setState({status:"success",data})
  }).catch(function(error){
     if(ignore){
      return
    }
    setState({status:"error",error})
  })


  return ()=>{
    ignore = true
  }
  }.deps)

  return state;
}