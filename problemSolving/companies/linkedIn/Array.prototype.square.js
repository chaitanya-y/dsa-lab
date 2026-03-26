// Implement a custom Array function, Array.prototype.square() which creates a new array with the results of squaring every element within the array the .square() method is called on.

// Examples
// [-2].square(); // [4]
// [1, 2, 3, 4].square(); // [1, 4, 9, 16]
// Notes
// The original array should not be modified.
// Assume that the array only contains numbers.
// Assume that the array will not be sparse, e.g. [1, 2, , 4].

/**
 * @return {Array<number>}
 */
Array.prototype.square = function () {
  const length = this.length;
  const results = new Array(length);

  for (let i = 0; i < length; i++) {
    results[i] = this[i] * this[i];
  }

  return results;
};


console.log([1,2,4,2,4].square())