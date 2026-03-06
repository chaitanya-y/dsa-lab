// Given an array of integers, return indices of the two numbers such that they add up to a specific target.

console.log('----Hash map approach----')

function twoSum(nums, target) {
  const seen = new Map(); // number -> index

  for (let i = 0; i < nums.length; i++) {
    const x = nums[i];
    const need = target - x;

    // If we've already seen "need", we found the pair
    if (seen.has(need)) {
      return [seen.get(need), i];
    }

    // Otherwise remember current number for future matches
    seen.set(x, i);
  }

  return "No two numbers add up to the target.";
}

//console.log('----Brute force approach----')
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

console.log(twoSum([2,2,7,15],22))
