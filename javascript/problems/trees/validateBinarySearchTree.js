// Validate Binary Search Tree
// Return whether every node satisfies the strict ordering rules of a BST.
// Complexity variables: n = node count; h = tree height.
//
// How to test:
// Test file: tests/javascript/validateBinarySearchTree.test.js
// Run: node --test tests/javascript/validateBinarySearchTree.test.js

/** Check whether every node in a subtree is strictly below a given limit. */
function allNodesLessThan(node, limit) {
  if (node === null) return true; // An empty subtree has no value that can violate the limit.
  if (node.val >= limit) return false; // One value at or above the limit breaks the BST rule.
  return allNodesLessThan(node.left, limit) && allNodesLessThan(node.right, limit); // Check every descendant.
}

/** Check whether every node in a subtree is strictly above a given limit. */
function allNodesGreaterThan(node, limit) {
  if (node === null) return true; // An empty subtree has no value that can violate the limit.
  if (node.val <= limit) return false; // One value at or below the limit breaks the BST rule.
  return allNodesGreaterThan(node.left, limit) && allNodesGreaterThan(node.right, limit); // Check every descendant.
}

/**
 * Brute force: repeatedly scan full left and right subtrees at every node.
 * Complexity: O(n^2) worst-case time and O(h) recursive call space.
 */
function isValidBSTBruteForce(root) {
  if (root === null) return true; // An empty tree satisfies all BST rules.
  if (!allNodesLessThan(root.left, root.val)) return false; // Every left descendant must be smaller.
  if (!allNodesGreaterThan(root.right, root.val)) return false; // Every right descendant must be larger.
  return isValidBSTBruteForce(root.left) && isValidBSTBruteForce(root.right); // Recheck both child trees.
}

/**
 * Intermediate: an inorder traversal of a BST must be strictly increasing.
 * Complexity: O(n) time and O(h) stack space.
 */
function isValidBSTInorder(root) {
  const stack = []; // Save ancestors while walking down left branches.
  let current = root; // Start the inorder traversal from the root.
  let hasPrevious = false; // Track whether one value has already been visited.
  let previousValue = 0; // Store the prior value after the first node is processed.

  while (current !== null || stack.length > 0) { // Continue until all nodes are visited.
    while (current !== null) { // Keep walking left to find the next smallest value.
      stack.push(current); // Save this node until its left subtree is done.
      current = current.left; // Inorder visits left before the node.
    }

    current = stack.pop(); // The last saved ancestor comes next in sorted order.
    if (hasPrevious && current.val <= previousValue) return false; // Values must strictly increase.
    previousValue = current.val; // Remember the current value for the next comparison.
    hasPrevious = true; // There is now a previous value to compare.
    current = current.right; // Visit the right subtree after this node.
  }

  return true; // Every inorder value was strictly larger than the previous one.
}

/**
 * Optimized: carry the strict lower/upper value limits from every ancestor.
 * Complexity: O(n) time and O(h) recursive call space.
 */
function isValidBST(root) {
  function valid(node, lower, upper) { // Check each node against its allowed range.
    if (node === null) return true; // An empty branch cannot violate any bound.
    if (!(node.val > lower && node.val < upper)) return false; // Bounds are strict; duplicates fail.
    return valid(node.left, lower, node.val) && valid(node.right, node.val, upper); // Narrow bounds for children.
  }

  return valid(root, -Infinity, Infinity); // The root starts with no numeric restrictions.
}

module.exports = { isValidBSTBruteForce, isValidBSTInorder, isValidBST };
