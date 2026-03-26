// A memoize function is a higher-order function that takes in a function and returns a memoized version of it. 
// The memoized function caches the results of expensive function calls and returns the cached result when it receives the same inputs again. 
// This can significantly improve the performance of functions that involve complex processing / significant latency and are called with the same arguments repeatedly.


// Implement a function memoize(func) that takes in a function parameter func and returns a memoized version of the function. 
// You may assume that func only accepts a string or number as its only argument.


/**
 * @param {Function} func
 * @returns Function
 */

function memoize(func) {
    const cache = new Map();

    return function(arg){
        
        if(cache.has(arg)){
            return cache.get(arg);
        }

        let result = func.call(this,arg)
        cache.set(arg,result)
        return result
    }
}

function expensiveFibonacci(n) {
  if (n <= 1) return n;
  return expensiveFibonacci(n - 1) + expensiveFibonacci(n - 2);
}

let memoizedFunction = memoize(expensiveFibonacci);
console.log(memoizedFunction(42))
console.log(memoizedFunction(2))
console.log(memoizedFunction(42))
