/***
 * @ @Implement a function groupBy(array, iteratee) that takes an array and an iteratee function, and groups the values in the array based on the iteratee.

groupBy(array, iteratee);
Arguments
array (Array): The array to iterate over.
iteratee (Function): The iteratee to transform elements. The function is invoked with one argument: (value).
Returns
(Object): Returns the composed aggregate object.

Examples

groupBy([6.1, 4.2, 6.3], Math.floor);
// => { '4': [4.2], '6': [6.1, 6.3] }

groupBy([{ n: 3 }, { n: 5 }, { n: 3 }], (o) => o.n);
// => { '3': [{ n: 3 }, { n: 3 }], '5': [{ n: 5 }] }
The function should return {} when array is empty and treat null / undefined keys after going through iteratee as it is.


groupBy([], (o) => o); // => {}

groupBy([{ n: 1 }, { n: 2 }], (o) => o.m); 
*/



// Approach 1: Standard method of basic functions
// Create an empty results object to store the group of occurrences of each key.
// Iterate through the array and determine the key for each element by calling iteratee(element). If the key does not exist within the results object, set the value for that key to an empty array. Next, append the element into that key.
/**
 * @param {Array|Object} array The array to iterate over.
 * @param {Function} iteratee The iteratee to transform keys.
 * @returns {Object} Returns the composed aggregate object.
 */
export default function groupBy(array, iteratee) {
  const result = {};

  for (const element of array) {
    const key = iteratee(element);
    if (!Object.prototype.hasOwnProperty.call(result, key)) {
      result[key] = [];
    }

    result[key].push(element);
  }

  return result;
}

console.log(groupBy([6.1, 4.2, 6.3], Math.floor))
console.log(groupBy([{ n: 3 }, { n: 5 }, { n: 3 }], (o) => o.n))



// Approach 2: Using nullish coalescing assignment operator
// An alternative way to create the result object is to use the nullish coalescing assignment operator to set the value to [] if key doesn't exist within result. Note that using nullish coalescing assignment operator means you might be accessing inherited properties, which is not desired, but since the object is created via Object.create(null), there will not be inherited properties and is safe to use.


// function groupBy(array, iteratee) {
//   const result = Object.create(null);

//   for (const element of array) {
//     const key = iteratee(element);
//     result[key] ??= [];
//     result[key].push(element);
//   }

//   return result;
// }