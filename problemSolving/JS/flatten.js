// Implement a function flatten that returns a newly-created array with all sub-array elements concatenated recursively into a single level.

// // Single-level arrays are unaffected.
// flatten([1, 2, 3]); // [1, 2, 3]

// // Inner arrays are flattened into a single level.
// flatten([1, [2, 3]]); // [1, 2, 3]
// flatten([
//   [1, 2],
//   [3, 4],
// ]); // [1, 2, 3, 4]

// // Flattens recursively.
// flatten([1, [2, [3, [4, [5]]]]]); // [1, 2, 3, 4, 5]
export default function flatten(value) {
  return value.reduce(
    (acc, curr) => acc.concat(Array.isArray(curr) ? flatten(curr) : curr),
    [],
  );
}

console.log(flatten([1, 2, 3])); // [1, 2, 3]
console.log(flatten([1, [2, 3]])); // [1, 2, 3]

// type ArrayValue = any | Array<ArrayValue>;
// export function* flattenGen(value: Array<ArrayValue>): Generator<any, void, unknown> {
//   for (const item of value) {
//     if (Array.isArray(item)) {
//       yield* flattenGen(item);     // delegate to inner generator
//     } else {
//       yield item;
//     }
//   }
// }


// type ArrayValue = any | Array<ArrayValue>;
// export default function flatten(value: Array<ArrayValue>): Array<any> {
//   while (value.some(Array.isArray)) {
//     value = [].concat(...value);
//   }

//   return value;
// }



// export default function flatten(value) {
//   let copy = value.slice();
//   let result = [];
//   while(copy.length){
//     let element = copy.shift();
//     if(Array.isArray(element)){
//       copy.unshift(...element)
//     }else{
//       result.push(element)
//     }
//   }

//   return result
// }
