// A memoize function is a higher-order function that takes in a function and returns a memoized version of it. 
// The memoized function caches the results of expensive function calls and returns the cached result when it receives the same inputs again.
//  This can significantly improve the performance of functions that involve complex processing / significant latency and are called with the same arguments repeatedly.

/**
 *  @Implement a function memoize(func) that takes in a function parameter func and returns a memoized version of the function. 
    You may assume that func only accepts strings or numbers as arguments.
*/



/**
 * @param {Function} func
 * @returns Function
 */

function memoize(func) {
    const cache = new Map();

    return function(...args){
    const key = JSON.stringify(args);
        if(cache.has(key)){
            return cache.get(key);
        }
        let result = func.apply(this,args)
        cache.set(key,result)
        return result
    }
}

function expensiveMul(a, b) {
  console.log('Computing...',a,b);
  return a * b;
}

let memoizedFunction = memoize(expensiveMul);
console.log(memoizedFunction(42,4))
console.log(memoizedFunction(2,2))
console.log(memoizedFunction(42,4))
