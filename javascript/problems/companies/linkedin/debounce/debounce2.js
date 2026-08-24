// Debouncing is a technique used to control how many times we allow a function to be executed over time. 
// When a JavaScript function is debounced with a wait time of X milliseconds, it must wait until after X milliseconds have elapsed since the debounced function was last called.

const { time, clear } = require("console");

//This is an advanced version of Debounce, you should complete that first before attempting this question. Please refer to debounce1.js

// Implement a debounce function which accepts a callback function and a wait duration. 
// Calling debounce() returns a function which has debounced invocations of the callback function following the behavior described above.
// Additionally, the debounce-ed function comes with two extra methods:
// cancel() method to cancel pending invocations
// flush() method to immediately invoke any delayed invocations

/**
 * @param {Function} func
 * @param {number} wait
 * @return {Function}
 */

function debounce(func, wait = 0) {
  let timeoutId = null;
  let context = undefined;
  let argsToInvoke = undefined;

  function clearTimer() {
    clearTimeout(timeoutId);
    timeoutId = null;
  }

  function invoke() {
    // Don't invoke if there's no pending callback.
    if (timeoutId == null) {
      return;
    }

    clearTimer();
    func.apply(context, argsToInvoke);
  }

  function fn(...args) {
    clearTimer();
    argsToInvoke = args;
    context = this;
    timeoutId = setTimeout(function () {
      invoke();
    }, wait);
  }

  fn.cancel = clearTimer;
  fn.flush = invoke;
  return fn;
}

// --- TESTING SUITE ---

let callCount = 0;
const targetFunction = (val) => {
  callCount++;
  console.log(`[EXECUTION] Called with: ${val}. Total runs: ${callCount}`);
};

const debounced = debounce(targetFunction, 1000);

// TEST 1: Testing cancel()
console.log("TEST 1: Calling and immediately cancelling...");
debounced("Should not appear");
debounced.cancel(); 

// TEST 2: Testing flush()
setTimeout(() => {
  console.log("\nTEST 2: Testing flush (immediate execution)...");
  debounced("Flushed Data");
  debounced.flush(); // This should run targetFunction immediately
}, 500);

// TEST 3: Verification
setTimeout(() => {
  console.log("\n--- FINAL VERIFICATION ---");
  if (callCount === 1) {
    console.log("SUCCESS: Only the flushed call ran. The cancelled call stayed dead.");
  } else {
    console.log(`FAILURE: Expected 1 execution, but got ${callCount}`);
  }
}, 2000);
