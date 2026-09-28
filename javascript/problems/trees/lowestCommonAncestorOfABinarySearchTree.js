// Lowest Common Ancestor of a Binary Search Tree
// Find the deepest node that is an ancestor of both target nodes.
// Complexity variables: n = node count; h = height of the BST.
//
// How to test:
// Test file: tests/javascript/lowestCommonAncestorOfABinarySearchTree.test.js
// Run: node --test tests/javascript/lowestCommonAncestorOfABinarySearchTree.test.js

/** Find a target by ordinary DFS while saving the root-to-target path. */
function findPathDFS(node, target, path) {
  if (node === null) return false; // An empty branch cannot contain the target.

  path.push(node); // Save this node as part of the current route from the root.
  if (node === target) return true; // Keep the path when this exact target is reached.
  if (findPathDFS(node.left, target, path)) return true; // Search the left branch first.
  if (findPathDFS(node.right, target, path)) return true; // Search the right branch next.

  path.pop(); // This node was not on the target's route, so backtrack.
  return false; // Tell the caller this branch did not contain the target.
}

/**
 * Brute force: find both paths, then return their deepest shared node.
 * This general-tree method works but does not use BST ordering.
 * Complexity: O(n) time and O(h) extra space for paths and DFS calls.
 */
function lowestCommonAncestorBruteForce(root, p, q) {
  const pathToP = []; // Store the route from root to the first target.
  const pathToQ = []; // Store the route from root to the second target.
  if (!findPathDFS(root, p, pathToP)) return null; // p is not in the supplied tree.
  if (!findPathDFS(root, q, pathToQ)) return null; // q is not in the supplied tree.

  let ancestor = null; // Remember the deepest node shared by both paths.
  const sharedLength = Math.min(pathToP.length, pathToQ.length); // Only compare their shared range.
  for (let index = 0; index < sharedLength; index += 1) { // Compare both paths from the root down.
    if (pathToP[index] !== pathToQ[index]) break; // Their first split ends their common prefix.
    ancestor = pathToP[index]; // This matching node is the newest common ancestor.
  }

  return ancestor; // Return the final shared node on the two paths.
}

/**
 * Recursive BST search: descend into the side containing both target values.
 * Complexity: O(h) time and O(h) recursive call space.
 */
function lowestCommonAncestorRecursive(root, p, q) {
  if (root === null) return null; // An empty branch has no common ancestor.
  if (p.val < root.val && q.val < root.val) { // Both targets are smaller than this node.
    return lowestCommonAncestorRecursive(root.left, p, q); // Their ancestor is on the left.
  }
  if (p.val > root.val && q.val > root.val) { // Both targets are larger than this node.
    return lowestCommonAncestorRecursive(root.right, p, q); // Their ancestor is on the right.
  }

  return root; // They split sides here, or this node is one of the targets.
}

/**
 * Optimized iterative BST search: use the split rule without recursion.
 * Complexity: O(h) time and O(1) extra space.
 */
function lowestCommonAncestor(root, p, q) {
  let current = root; // Begin at the top of the search tree.

  while (current !== null) { // Stop at a split point or when the branch ends.
    if (p.val > current.val && q.val > current.val) { // Both targets are to the right.
      current = current.right; // Only the right side can contain their ancestor.
    } else if (p.val < current.val && q.val < current.val) { // Both targets are to the left.
      current = current.left; // Only the left side can contain their ancestor.
    } else { // The targets split sides, or one target is this node.
      return current; // This first split point is the lowest common ancestor.
    }
  }

  return null; // The targets were not both found below the supplied root.
}

module.exports = { lowestCommonAncestorBruteForce, lowestCommonAncestorRecursive, lowestCommonAncestor };
