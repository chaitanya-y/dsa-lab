// Same Tree
// Compare both tree values and shape at every corresponding position.
// Complexity variables: n = node count; h = maximum height; w = maximum width.
//
// How to test:
// Test file: tests/javascript/sameTree.test.js
// Run: node --test tests/javascript/sameTree.test.js

/**
 * Recursive DFS: compare corresponding nodes and then their child pairs.
 * How we solve it: two nulls match; one null or unequal values do not; otherwise
 * both left children and both right children must recursively match.
 * Complexity: O(n) time and O(h) recursion space.
 */
function isSameTreeRecursive(p, q) {
  if (p === null && q === null) return true; // Two missing nodes mean these branches match.
  if (p === null || q === null) return false; // A node on only one side means different shapes.
  if (p.val !== q.val) return false; // Values at the same position must be equal.

  return isSameTreeRecursive(p.left, q.left) && isSameTreeRecursive(p.right, q.right); // Both child pairs must match.
}

/**
 * Iterative DFS: compare pairs with a stack instead of recursive calls.
 * How we solve it: pop one corresponding pair, check nulls and values, then
 * push the left pair and right pair for later comparison.
 * Complexity: O(n) time and O(h) stack space on average, up to O(n) worst case.
 */
function isSameTreeDFSIterative(p, q) {
  const pending = [[p, q]]; // Each stack item is a pair of corresponding positions.

  while (pending.length > 0) { // Keep going while some node pairs remain unchecked.
    const [first, second] = pending.pop(); // A stack visits the newest pair first (DFS).

    if (first === null && second === null) continue; // Two empty positions match.
    if (first === null || second === null) return false; // Only one node means different shapes.
    if (first.val !== second.val) return false; // Matching positions need equal values.

    pending.push([first.left, second.left]); // Check the left-child pair.
    pending.push([first.right, second.right]); // Check the right-child pair.
  }

  return true; // Every corresponding value and child position matched.
}

/**
 * BFS: compare corresponding nodes level by level with a queue.
 * How we solve it: remove a pair, check nulls and values, then enqueue both
 * child pairs. An empty queue means no mismatch was found.
 * Complexity: O(n) time and O(w) queue space, where w is maximum level width.
 */
function isSameTreeBFS(p, q) {
  const pending = [[p, q]]; // The queue starts with both roots.
  let front = 0; // A moving index avoids costly removal from the array's front.

  while (front < pending.length) { // Process pairs in the order they were enqueued.
    const [first, second] = pending[front]; // Read the earliest pair (BFS order).
    front += 1; // Move the queue's front to the next pair.

    if (first === null && second === null) continue; // Two empty positions match.
    if (first === null || second === null) return false; // Only one node means different shapes.
    if (first.val !== second.val) return false; // Matching positions need equal values.

    pending.push([first.left, second.left]); // Compare their left children at the next level.
    pending.push([first.right, second.right]); // Compare their right children at the next level.
  }

  return true; // No pair differed, so the trees match.
}

// Keep the familiar function name as the simple recursive version.
const isSameTree = isSameTreeRecursive;

module.exports = { isSameTree, isSameTreeRecursive, isSameTreeDFSIterative, isSameTreeBFS };
