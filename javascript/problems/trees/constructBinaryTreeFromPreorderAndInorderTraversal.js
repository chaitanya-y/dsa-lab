// Construct Binary Tree from Preorder and Inorder Traversal
// Rebuild a binary tree from its preorder and inorder value arrays.
// Complexity variables: n = node count; h = height of the constructed tree.
//
// How to test:
// Test file: tests/javascript/constructBinaryTreeFromPreorderAndInorderTraversal.test.js
// Run: node --test tests/javascript/constructBinaryTreeFromPreorderAndInorderTraversal.test.js

/**
 * Brute force: search for each root in inorder and pass copied array slices.
 * How it works: preorder's first value is the root; its inorder position splits
 * left and right subtrees. Search and slice again for each smaller subtree.
 * Complexity: O(n^2) worst-case time and O(n^2) extra space from recursive slices.
 */
function buildTreeBruteForce(preorder, inorder) {
  if (preorder.length === 0) return null; // An empty preorder range has no root.

  const rootValue = preorder[0]; // Preorder always lists this subtree's root first.
  const rootIndex = inorder.indexOf(rootValue); // Search inorder to locate the split.
  const leftSize = rootIndex; // Values before the root belong to the left subtree.
  const root = new TreeNode(rootValue); // Create the root node provided by the judge.
  root.left = buildTreeBruteForce( // Rebuild the left subtree from its sliced traversals.
    preorder.slice(1, leftSize + 1),
    inorder.slice(0, rootIndex),
  );
  root.right = buildTreeBruteForce( // Rebuild the right subtree from its sliced traversals.
    preorder.slice(leftSize + 1),
    inorder.slice(rootIndex + 1),
  );
  return root; // Return this root with its reconstructed children.
}

/**
 * Intermediate: map inorder positions for fast root lookup, but continue slicing.
 * How it works: look up each root in a map instead of rescanning inorder; copied
 * preorder slices still cost O(n^2) time and space in a skewed tree.
 * Complexity: O(n^2) worst-case time and O(n^2) extra space for those slices.
 */
function buildTreeWithIndexMapAndSlices(preorder, inorder) {
  const indexByValue = new Map(); // Map each unique node value to its inorder position.
  inorder.forEach((value, index) => indexByValue.set(value, index)); // Build that map once.

  function build(preorderPart, inorderStart, inorderEnd) { // Rebuild one inorder range.
    if (inorderStart > inorderEnd) return null; // This range describes an empty subtree.
    const rootValue = preorderPart[0]; // The first preorder value is this subtree's root.
    const rootIndex = indexByValue.get(rootValue); // Find the root's split without scanning.
    const leftSize = rootIndex - inorderStart; // Count nodes assigned to the left subtree.
    const root = new TreeNode(rootValue); // Make this root node.
    root.left = build( // Use the left preorder slice and its matching inorder range.
      preorderPart.slice(1, leftSize + 1),
      inorderStart,
      rootIndex - 1,
    );
    root.right = build( // Use the remaining preorder slice and right inorder range.
      preorderPart.slice(leftSize + 1),
      rootIndex + 1,
      inorderEnd,
    );
    return root; // Return this complete subtree to its parent call.
  }

  return build(preorder, 0, inorder.length - 1); // Begin with the entire inorder range.
}

/**
 * Optimized: use an inorder-position map and integer bounds, never copied slices.
 * How it works: preorderStart identifies the next root; the map gives its inorder
 * split; leftSize tells us the next preorder index for the right subtree.
 * Complexity: O(n) time; O(n) map space plus O(h) recursive call-stack space.
 */
function buildTreeOptimized(preorder, inorder) {
  const indexByValue = new Map(); // Save the inorder index for every unique value.
  inorder.forEach((value, index) => indexByValue.set(value, index)); // Build once for O(1) lookups.

  function build(preorderStart, inorderStart, inorderEnd) { // Build using indexes into original arrays.
    if (inorderStart > inorderEnd) return null; // No indexes in this range means no node.
    const rootValue = preorder[preorderStart]; // The current preorder position gives the root.
    const rootIndex = indexByValue.get(rootValue); // Locate the root's split in inorder.
    const leftSize = rootIndex - inorderStart; // Count the left-subtree nodes from that split.
    const root = new TreeNode(rootValue); // Create the root for this subtree.
    root.left = build( // Left preorder starts right after root; inorder ends before root.
      preorderStart + 1,
      inorderStart,
      rootIndex - 1,
    );
    root.right = build( // Right preorder skips root and all left-subtree values.
      preorderStart + leftSize + 1,
      rootIndex + 1,
      inorderEnd,
    );
    return root; // Return this subtree after both children have been built.
  }

  return build(0, 0, inorder.length - 1); // Start with both complete traversal ranges.
}

const buildTree = buildTreeOptimized; // Keep the standard judge function on the linear-time approach.

module.exports = {
  buildTree,
  buildTreeBruteForce,
  buildTreeWithIndexMapAndSlices,
  buildTreeOptimized,
};
