function throttle(fn,delay){
    let isThrottled = false;
    return function(...args){
        if(isThrottled) return;
        fn.apply(this,args)
        isThrottled = true
        setTimeout(()=>{
            isThrottled = false;
        },delay)
    }
}


let throttledfuntion = throttle((x)=>{console.log('-----',x)},1000)




throttledfuntion(5)

setTimeout(()=>{
throttledfuntion(5)
    
},500)
setTimeout(()=>{

throttledfuntion(5)
    
},1000)