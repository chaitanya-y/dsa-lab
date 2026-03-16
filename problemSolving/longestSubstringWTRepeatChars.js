// Brute force idea
// Generate every possible substring.
// For each substring:
// check whether all characters are unique
// if yes, update max length


// function longestSubstringWTRepeat(string){
//     let maxLength = 0;
//     for(let i=0;i<string.length;i++){

//         let seen = new Set();
//         for(let j=i;j<string.length;j++){
//             // console.log("---",string[j],seen.has(string[j]))
//             if(seen.has(string[j])){
//                 break;
//             }
//             seen.add(string[j]);
//             maxLength = Math.max(maxLength,j-i+1);
//         }
//         // console.log(i,">>.",seen,maxLength)
//     }
//     return maxLength
// }


//Optimized approach
// a Set to track characters in the current window
// two pointers:
// left
// right

// Core idea
// move right forward to expand the window
// if duplicate appears, move left forward and remove characters until duplicate is gone
// keep updating max length

// Step-by-step intuition
// Example:
// s = "abcabcbb"

// Start:

// left = 0
// right = 0
// set = {}
// maxLength = 0

// right = 0, char = "a"
// not in set
// add "a"
// window = "a"
// max = 1

// right = 1
// not in set
// add "b"
// window = "ab"
// max = 2

// right = 2, char = "c"`
// not in set
// add "c"
// window = "abc"
// max = 3
// right = 3, char = "a"`
// duplicate found
// remove s[left] which is "a"
// move left to 1
// now "a" is no longer duplicate
// add "a"
// window becomes "bca"
// max stays 3
// And so on.

// The key trick is:
// when duplicate appears, we shrink from the left until the window is valid again.
function lengthOfLongestSubstring(s) {
  let left = 0;
  let maxLength = 0;
  const seen = new Set();

  for (let right = 0; right < s.length; right++) {
    while (seen.has(s[right])) {
      seen.delete(s[left]);
      left++;
    }

    seen.add(s[right]);
    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
}

console.log("Longest substring without repeating characters length is",lengthOfLongestSubstring("abcabcbb"));