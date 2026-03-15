// Given an array of integers, return indices of the two numbers such that they add up to a specific target.

console.log('--Optimized--Hash map approach----')

function twoSum(nums, target) {
  const seen = new Map(); // number -> index

  for (let i = 0; i < nums.length; i++) {
    const current = nums[i];
    const complement = target - current;
    // If we've already seen "need", we found the pair
    if (seen.has(complement)) {
      return [seen.get(complement), i];
    }
    // Otherwise remember current number for future matches
    seen.set(current, i);
  }

  return "No two numbers add up to the target.";
}

// console.log('----Brute force approach----')
// function twoSum(arr, target){
//     for(let i=0;i<arr.length;i++){
//         for(let j=i+1;j<arr.length;j++){
//             if(arr[i]+arr[j] === target){
//                 return [i,j]
//             }
//         }
//     }
//     return "No two numbers add up to the target."
// }

console.log(twoSum([2,2,7,15],9))
