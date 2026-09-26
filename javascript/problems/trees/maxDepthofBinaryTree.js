// Maximum Depth of Binary Tree
// Return the number of nodes on the longest root-to-leaf path.
// Complexity variables: n = number of nodes; h = height; w = maximum level width.
//
// How to test:
// Test file: tests/javascript/maximumDepthOfBinaryTree.test.js
// Run: node --test tests/javascript/maximumDepthOfBinaryTree.test.js

/**
 * Recursive DFS: depth = 1 + the deeper of the left and right subtree depths.
 * How this solution works: an empty tree has depth 0; for a real node, ask
 * both child subtrees for their depths, take the larger, and add 1 for this node.
 * Complexity: O(n) time and O(h) recursion space, where n is node count and h
 * is tree height.
 */
function maxDepthRecursive(root) {
  if (root === null) return 0; // An empty subtree contributes zero levels.

  return 1 + Math.max( // Count this node plus the longer child path.
    maxDepthRecursive(root.left), // Find the height below the left child.
    maxDepthRecursive(root.right), // Find the height below the right child.
  );
}

/**
 * Iterative DFS: store each node together with its depth on a stack.
 * How this solution works: pop a node/depth pair, update the deepest value,
 * and push each child with depth + 1 until every node has been visited.
 * Complexity: O(n) time and O(h) stack space, up to O(n) in the worst case.
 */
function maxDepthDFSIterative(root) {
  if (root === null) return 0; // An empty tree has no levels.

  const stack = [[root, 1]]; // The root is the first node and is at depth one.
  let deepestLevel = 0; // Remember the largest depth visited so far.

  while (stack.length > 0) { // Continue until no nodes remain to visit.
    const [node, depth] = stack.pop(); // Take one node and its distance from the root.
    deepestLevel = Math.max(deepestLevel, depth); // Update the greatest level seen.

    if (node.left !== null) stack.push([node.left, depth + 1]); // A child is one level deeper.
    if (node.right !== null) stack.push([node.right, depth + 1]); // Remember the other child too.
  }

  return deepestLevel; // The deepest node's level is the tree's maximum depth.
}

/**
 * BFS: count the tree one level at a time with a queue.
 * How this solution works: freeze the current queue size, process exactly that
 * many nodes, queue their children for the next level, then add one to depth.
 * Complexity: O(n) time and O(w) queue space, where w is maximum level width.
 */
function maxDepthBFS(root) {
  if (root === null) return 0; // An empty tree has zero levels.

  const queue = [root]; // Start level-order traversal with the root.
  let front = 0; // A front index avoids costly array shifting.
  let depth = 0; // Count completed levels, not individual nodes.

  while (front < queue.length) { // Continue while there are nodes in some level.
    const levelEnd = queue.length; // Nodes before this point belong to the current level.

    while (front < levelEnd) { // Process only the nodes already in this level.
      const node = queue[front]; // Read the next node in this level.
      front += 1; // Move the queue front forward.
      if (node.left !== null) queue.push(node.left); // Save its left child for the next level.
      if (node.right !== null) queue.push(node.right); // Save its right child for the next level.
    }

    depth += 1; // One entire level has now been processed.
  }

  return depth; // The number of levels is the maximum depth.
}

const maxDepth = maxDepthRecursive; // Keep the standard platform name for the recursive version.

module.exports = { maxDepth, maxDepthBFS, maxDepthDFSIterative, maxDepthRecursive };
