"""Maximum Depth of Binary Tree.

Return the number of nodes along the longest path from the root down to a leaf.

Complexity variables: n = number of nodes; h = tree height; w = maximum tree width.

How to test:
Test file: tests/python/test_maximum_depth_of_binary_tree.py
Run: PYTHONDONTWRITEBYTECODE=1 python3 -m unittest -v tests/python/test_maximum_depth_of_binary_tree.py
"""

from __future__ import annotations  # Allow the judge-provided TreeNode type in hints.

from collections import deque  # Provide an efficient queue for level-order traversal.
from typing import Optional  # A tree can be empty, so its root may be None.


def max_depth_recursive(root: Optional[TreeNode]) -> int:
    """Recursive DFS: depth is one plus the deeper child subtree.

    How this solution works:
    1. An empty tree has depth 0.
    2. Find the depth of the left subtree recursively.
    3. Find the depth of the right subtree recursively.
    4. Add 1 for this node to the larger child depth.
    The core formula is: ``1 + max(left depth, right depth)``.

    Time: O(n), because every node is visited once.
    Extra space: O(h), for the recursive call stack.
    """
    if root is None:  # An empty tree has no nodes on a root-to-leaf path.
        return 0  # Use zero as the depth of an empty subtree.

    return 1 + max(  # Count this root, then choose the deeper child path.
        max_depth_recursive(root.left),  # Recursively measure the left subtree.
        max_depth_recursive(root.right),  # Recursively measure the right subtree.
    )


def max_depth_dfs_iterative(root: Optional[TreeNode]) -> int:
    """Iterative DFS: store each node together with its depth on a stack.

    How this solution works:
    1. Put the root and depth 1 on the stack.
    2. Pop a node/depth pair and update the largest depth seen.
    3. Push each child with its parent's depth plus one.
    4. Return the largest depth after every node has been visited.

    Time: O(n), because each node is pushed and popped once.
    Extra space: O(h) for the DFS stack, up to O(n) in the worst case.
    """
    if root is None:  # No nodes means no root-to-leaf path.
        return 0  # The empty tree has depth zero.

    stack = [(root, 1)]  # Start with the root, which is at depth one.
    deepest_level = 0  # Track the largest depth popped from the stack.

    while stack:  # Continue until all nodes have been visited.
        node, depth = stack.pop()  # Take one node and its distance from the root.
        deepest_level = max(deepest_level, depth)  # Save the greatest depth seen.

        if node.left is not None:  # A left child is one level below this node.
            stack.append((node.left, depth + 1))  # Remember its depth for later.
        if node.right is not None:  # A right child is one level below this node.
            stack.append((node.right, depth + 1))  # Remember its depth for later.

    return deepest_level  # The deepest visited node defines the tree depth.


def max_depth_bfs(root: Optional[TreeNode]) -> int:
    """BFS: count levels while visiting the tree in level order.

    How this solution works:
    1. Put the root in a queue; an empty tree has depth zero.
    2. Process exactly the nodes currently in the queue (one whole level).
    3. Add their children for the next level, then increase depth by one.
    4. When the queue is empty, the number of processed levels is the depth.

    Time: O(n), because each node enters and leaves the queue once.
    Extra space: O(w), where w is the maximum number of nodes on one level.
    """
    if root is None:  # An empty tree contains zero levels.
        return 0  # Its maximum depth is zero.

    queue = deque([root])  # Start the level-order traversal at the root.
    depth = 0  # Count how many complete levels have been processed.

    while queue:  # Continue while there are nodes in the current or next level.
        level_size = len(queue)  # Freeze how many nodes belong to this level.

        for _ in range(level_size):  # Process only nodes from this one level.
            node = queue.popleft()  # Remove the next node from this level.
            if node.left is not None:  # Add a left child to the upcoming level.
                queue.append(node.left)  # The child will be processed next round.
            if node.right is not None:  # Add a right child to the upcoming level.
                queue.append(node.right)  # The child will be processed next round.

        depth += 1  # One complete level has now been processed.

    return depth  # The total number of levels equals maximum depth.


class Solution:
    """Expose recursive DFS with the standard interview-platform method name."""

    def maxDepth(self, root: Optional[TreeNode]) -> int:
        """Call the recursive formula used by the standard signature."""
        return max_depth_recursive(root)  # Keep one source of truth for recursion.
