// Invert Binary Tree
// Swap the left and right child of every node and return the same root.
// All approaches modify the input tree in place.
// Complexity variables: n = number of nodes; h = height; w = maximum level width.
//
// How to test:
// Test file: tests/javascript/invertBinaryTree.test.js
// Run: node --test tests/javascript/invertBinaryTree.test.js

/**
 * Recursive DFS: swap this node's children, then invert both subtrees.
 * How this solution works: stop at null; otherwise swap left/right, recurse on
 * both new children, and return the same node as the root of this subtree.
 * Complexity: O(n) time and O(h) recursion space, where n is node count and h
 * is tree height.
 */
function invertTreeRecursive(root) {
  if (root === null) return null; // An empty subtree has nothing to swap.

  [root.left, root.right] = [root.right, root.left]; // Mirror this node by exchanging its children.
  invertTreeRecursive(root.left); // Invert the child now on the left.
  invertTreeRecursive(root.right); // Invert the child now on the right.
  return root; // Return this root after its whole subtree has been inverted.
}

/**
 * Iterative DFS: use a stack to visit every node and swap its children.
 * How this solution works: pop a node, swap its children, and push the
 * non-empty children until the stack is empty.
 * Complexity: O(n) time and O(h) stack space, up to O(n) in the worst case.
 */
function invertTreeDFSIterative(root) {
  if (root === null) return null; // An empty tree needs no work.

  const stack = [root]; // Begin depth-first traversal at the root.

  while (stack.length > 0) { // Stop when every discovered node has been processed.
    const node = stack.pop(); // Take the most recently discovered node.
    [node.left, node.right] = [node.right, node.left]; // Swap its left and right children.

    if (node.left !== null) stack.push(node.left); // Visit its left child after the swap.
    if (node.right !== null) stack.push(node.right); // Visit its right child after the swap.
  }

  return root; // Return the original root, now pointing at the inverted tree.
}

/**
 * BFS: use a queue to swap every node in level order.
 * How this solution works: remove the next queued node, swap its children, and
 * enqueue its non-empty children until no nodes remain.
 * Complexity: O(n) time and O(w) queue space, where w is maximum level width.
 */
function invertTreeBFS(root) {
  if (root === null) return null; // An empty tree has no levels to process.

  const queue = [root]; // Start breadth-first traversal at the root.
  let front = 0; // Use a moving index so removing queue items stays O(1).

  while (front < queue.length) { // Continue until every discovered node is visited.
    const node = queue[front]; // Read the next node in level order.
    front += 1; // Advance the queue's front to the next node.
    [node.left, node.right] = [node.right, node.left]; // Swap this node's children.

    if (node.left !== null) queue.push(node.left); // Queue its left child after swapping.
    if (node.right !== null) queue.push(node.right); // Queue its right child after swapping.
  }

  return root; // Return the same root after every level has been mirrored.
}

const invertTree = invertTreeRecursive; // Keep the standard platform name for the recursive version.

module.exports = { invertTree, invertTreeBFS, invertTreeDFSIterative, invertTreeRecursive };
