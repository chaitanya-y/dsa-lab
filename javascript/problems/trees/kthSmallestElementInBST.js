// Kth Smallest Element in a BST
// Return the value at position k in the BST's sorted order.
// Complexity variables: n = node count; h = tree height; k = requested position.
//
// How to test:
// Test file: tests/javascript/kthSmallestElementInBST.test.js
// Run: node --test tests/javascript/kthSmallestElementInBST.test.js

/**
 * Brute force: collect every value, sort them, and read position k.
 * How it works: visit all nodes, sort their values from low to high, and return
 * index k - 1 because JavaScript arrays start at index zero.
 * Complexity: O(n log n) time for sorting and O(n) extra space for the values.
 */
function kthSmallestBruteForce(root, k) {
  const values = []; // Keep all node values so they can be sorted together.

  function collect(node) { // Visit each node and append its value to the list.
    if (node === null) return; // An empty branch contains no value to save.
    values.push(node.val); // Save this node before visiting its children.
    collect(node.left); // Collect every value from the left subtree.
    collect(node.right); // Collect every value from the right subtree.
  }

  collect(root); // Start collecting values from the root.
  values.sort((a, b) => a - b); // Sort numerically from smallest to largest.
  return values[k - 1]; // Convert the one-based position k to a zero-based index.
}

/**
 * Intermediate: inorder traversal lists BST values in increasing order.
 * How it works: visit left subtree, node, then right subtree, save the entire
 * sequence, and return its value at index k - 1.
 * Complexity: O(n) time and O(n) list space, plus O(h) recursive call space.
 */
function kthSmallestInorder(root, k) {
  const values = []; // Store every value in inorder, which is sorted for a BST.

  function visitInorder(node) { // Recursively visit left side, current node, right side.
    if (node === null) return; // An empty subtree contributes no values.
    visitInorder(node.left); // Smaller values are visited before this node.
    values.push(node.val); // Save this node after its left subtree is finished.
    visitInorder(node.right); // Larger values are visited after this node.
  }

  visitInorder(root); // Build the full sorted sequence starting at the root.
  return values[k - 1]; // Return the requested value using a zero-based index.
}

/**
 * Optimized: stop an iterative inorder traversal as soon as node k is reached.
 * How it works: a stack finds the next smallest node; count popped nodes and
 * return immediately at k, without visiting the larger values after it.
 * Complexity: O(h + k) time and O(h) stack space.
 */
function kthSmallestOptimized(root, k) {
  const stack = []; // Save ancestors whose left subtrees are not finished yet.
  let current = root; // Start the inorder walk from the root.
  let visitedCount = 0; // Count values in smallest-to-largest order.

  while (current !== null || stack.length > 0) { // Continue while work remains.
    while (current !== null) { // Move left to reach the next smallest value.
      stack.push(current); // Save this node until its left side has been visited.
      current = current.left; // Inorder visits the left child first.
    }

    current = stack.pop(); // The most recently saved node comes next in sorted order.
    visitedCount += 1; // Record this node's one-based sorted position.
    if (visitedCount === k) return current.val; // Stop as soon as position k is found.
    current = current.right; // Continue with larger values only if k is not reached.
  }

  return -1; // The problem guarantees valid k; this fallback handles invalid input.
}

const kthSmallest = kthSmallestOptimized; // Keep the standard judge function optimized.

module.exports = {
  kthSmallest,
  kthSmallestBruteForce,
  kthSmallestInorder,
  kthSmallestOptimized,
};
