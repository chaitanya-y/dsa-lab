function reverseStringBruteForce(str) {
  let reversed = "";
  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }
  return reversed;
}

// Example usage:
console.log(reverseStringBruteForce("hello")); // Output: "olleh"



function reverseStringOptimized(str) {
  return str.split("").reverse().join("");
}

// Example usage:
console.log(reverseStringOptimized("hello")); // Output: "olleh"



function reverseStringOptimizedUnicode(str) {
  return [...str].reverse().join("");
  // or Array.from(str).reverse().join("");
}

// Example usage with emoji:
console.log(reverseStringOptimizedUnicode("👋hello🌎")); // Output: "🌎olleh👋"
