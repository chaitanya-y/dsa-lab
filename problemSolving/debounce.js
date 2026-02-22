/**
 *Debouncing is a technique used to control how many times we allow a function to be executed over time. When a JavaScript function is debounced with a wait time of X milliseconds, it must wait until after X milliseconds have elapsed since the debounced function was last called.
 */
export default function debounce(func, wait) {
  let timeout = null;

  return function (...args){

let context = this;
clearTimeout(timeout)
timeout = setTimeout(
    ()=>{
      timeout = null
      func.apply(context,args);
    }
  ,wait);

  }
}




/**
 * @param {Function} func
 * @param {number} wait
 * @return {Function}
 */
// export default function advanceddebounce(func, wait = 0) {
//   let timeoutId = null;
//   let context = undefined;
//   let argsToInvoke = undefined;

//   function clearTimer() {
//     clearTimeout(timeoutId);
//     timeoutId = null;
//   }

//   function invoke() {
//     // Don't invoke if there's no pending callback.
//     if (timeoutId == null) {
//       return;
//     }

//     clearTimer();
//     func.apply(context, argsToInvoke);
//   }

//   function fn(...args) {
//     clearTimer();
//     argsToInvoke = args;
//     context = this;
//     timeoutId = setTimeout(function () {
//       invoke();
//     }, wait);
//   }

//   fn.cancel = clearTimer;
//   fn.flush = invoke;
//   return fn;
// }
