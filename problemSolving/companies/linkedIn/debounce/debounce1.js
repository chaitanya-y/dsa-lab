// Debouncing is a technique used to control how many times we allow a function to be executed over time. 
// When a JavaScript function is debounced with a wait time of X milliseconds, it must wait until after X milliseconds have elapsed since the debounced function was last called.


// Implement a debounce function which accepts a callback function and a wait duration.
//  Calling debounce() returns a function which has debounced invocations of the callback function following the behavior described above.



/**
 * @callback func
 * @param {number} wait
 * @return {Function}
 */

function debounce(func, wait = 0) {
  let timeoutID = null;

  return function (...args) {
    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => {
      timeoutID = null; 
      // Has the same `this` as the outer function's
      // as it's within an arrow function.
      func.apply(this, args);
    }, wait);
  };
}

// clearTimeout() is a forgiving function and passing an invalid ID to clearTimeout() silently does nothing; no exception is thrown. 
// Hence we don't have to check for timeoutID === null before using clearTimeout().



// Test Setup
let callCount = 0;
const targetFunction = (val) => {
  callCount++;
  console.log(`[EXECUTION] Function ran with: ${val}. Total runs: ${callCount}`);
};


const  debouncedVersion = debounce(targetFunction,1000)


// Simulating Rapid Calls
console.log("Starting rapid calls (every 100ms)...");

let interactions = 0;
const interval = setInterval(() => {
  interactions++;
  console.log(`Attempt ${interactions}: calling debounced function...`);
  debouncedVersion("Final Data");

  // Stop after 5 rapid attempts
  if (interactions === 5) {
    clearInterval(interval);
    console.log("Rapid calls stopped. Waiting for debounce timer...");
  }
}, 100);


