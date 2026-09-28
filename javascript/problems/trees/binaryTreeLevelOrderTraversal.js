// Binary Tree Level Order Traversal
// Return one list of node values per level, from left to right.
// Complexity variables: n = node count; h = height; w = maximum level width.
//
// How to test:
// Test file: tests/javascript/binaryTreeLevelOrderTraversal.test.js
// Run: node --test tests/javascript/binaryTreeLevelOrderTraversal.test.js

/** Collect values exactly `depth` edges below this node. */
function collectNodesAtDepth(node, depth, level) {
  if (node === null) return; // An empty branch has no values to collect.
  if (depth === 0) { // This node is on the requested level.
    level.push(node.val); // Preserve left-to-right order.
    return; // Do not look below the requested level.
  }

  collectNodesAtDepth(node.left, depth - 1, level); // Search left before right.
  collectNodesAtDepth(node.right, depth - 1, level); // Then search the right branch.
}

/**
 * Brute force: run a fresh depth-limited DFS for each level.
 * Complexity: O(n * h) worst-case time due to revisiting nodes; O(h) working space.
 */
function levelOrderBruteForce(root) {
  const result = []; // Store one values array per level.
  let depth = 0; // The root is at depth zero.

  while (true) { // Keep asking for deeper levels until no nodes are found.
    const level = []; // Collect values only at this depth.
    collectNodesAtDepth(root, depth, level); // Search the tree again for this level.
    if (level.length === 0) break; // No values means all levels have been collected.
    result.push(level); // Save this level in left-to-right order.
    depth += 1; // Request the next level.
  }

  return result; // Return all levels after the repeated searches finish.
}

/**
 * Recursive DFS: carry each node's depth and append it to that level's list.
 * Complexity: O(n) time and O(h) recursive call space, excluding the result.
 */
function levelOrderDFS(root) {
  const result = []; // The array index will match each node's depth.

  function visit(node, depth) { // Visit nodes while tracking their level.
    if (node === null) return; // Empty children contribute no values.
    if (depth === result.length) result.push([]); // Start a list the first time we reach a level.
    result[depth].push(node.val); // Add the value to its level in left-to-right order.
    visit(node.left, depth + 1); // Visit the left child one level deeper.
    visit(node.right, depth + 1); // Visit the right child one level deeper.
  }

  visit(root, 0); // Start at the root on level zero.
  return result; // DFS has filled one list for every level.
}

/**
 * Optimized BFS: freeze the current queue size to process one full level.
 * Complexity: O(n) time and O(w) queue space, excluding the result.
 */
function levelOrder(root) {
  if (root === null) return []; // An empty tree has no levels.

  const result = []; // Store the output values grouped by depth.
  const queue = [root]; // Begin breadth-first search with the root.
  let front = 0; // Use an index so removing the queue front stays efficient.

  while (front < queue.length) { // Continue while nodes remain in some level.
    const levelEnd = queue.length; // Freeze the end of this level before adding children.
    const level = []; // Collect only values from the current level.

    while (front < levelEnd) { // Process nodes that were queued before this level began.
      const node = queue[front]; // Read the next node from this level.
      front += 1; // Advance the queue front.
      level.push(node.val); // Save this node's value.
      if (node.left !== null) queue.push(node.left); // Queue a real left child for next level.
      if (node.right !== null) queue.push(node.right); // Queue a real right child for next level.
    }

    result.push(level); // Save the completed level before processing its children.
  }

  return result; // Return the completed level-by-level traversal.
}

module.exports = { levelOrderBruteForce, levelOrderDFS, levelOrder };
