"""Binary Tree Level Order Traversal.

Return one list of node values per tree level, from left to right.

Complexity variables: n = number of nodes; h = tree height; w = maximum level width.

How to test:
Test file: tests/python/test_binary_tree_level_order_traversal.py
Run: PYTHONDONTWRITEBYTECODE=1 python3 -m unittest -v tests/python/test_binary_tree_level_order_traversal.py
"""

from __future__ import annotations  # TreeNode is supplied by the coding platform.

from collections import deque  # BFS needs a queue that removes its first item quickly.
from typing import Optional  # A tree root may be empty.


def _collect_nodes_at_depth(
    node: Optional[TreeNode], depth: int, level: list[int]
) -> None:
    """Collect values that are exactly ``depth`` edges below this node."""
    if node is None:  # An empty branch has no values at any depth.
        return  # Nothing needs to be added for this branch.
    if depth == 0:  # This node is at the requested level.
        level.append(node.val)  # Keep the left-to-right traversal order.
        return  # Do not descend below the requested level.

    _collect_nodes_at_depth(node.left, depth - 1, level)  # Search the left side first.
    _collect_nodes_at_depth(node.right, depth - 1, level)  # Then search the right side.


def level_order_brute_force(root: Optional[TreeNode]) -> list[list[int]]:
    """Brute force: run a fresh depth-limited DFS for each level.

    How this solution works: ask for depth 0, then depth 1, and continue until
    a search returns no nodes. It is simple but revisits upper nodes many times.

    Time: O(n * h) in the worst case because nodes are revisited for each level.
    Extra space: O(h) for DFS calls, excluding the returned level lists.
    """
    result: list[list[int]] = []  # Store a separate values list for each level.
    depth = 0  # The root is at depth zero.

    while True:  # Keep requesting deeper levels until none contain nodes.
        level: list[int] = []  # Collect only values at this requested depth.
        _collect_nodes_at_depth(root, depth, level)  # Search the whole tree for this level.
        if not level:  # No nodes at this depth means all tree levels are done.
            break  # Avoid adding an empty level to the result.
        result.append(level)  # Save this level in left-to-right order.
        depth += 1  # Request the next level on the following pass.

    return result  # Return the grouped values after every level was found.


def level_order_dfs(root: Optional[TreeNode]) -> list[list[int]]:
    """Recursive DFS: place each visited value in the list for its depth.

    How this solution works: carry the current depth through DFS, create a new
    result list the first time a depth is reached, then append values there.

    Time: O(n), because each node is visited once.
    Extra space: O(h) for recursion, excluding the O(n) returned values.
    """
    result: list[list[int]] = []  # Index depth in this list to get that level's values.

    def visit(node: Optional[TreeNode], depth: int) -> None:  # Traverse with each node's level.
        if node is None:  # Empty children contribute no values.
            return  # Stop this branch.
        if depth == len(result):  # This is the first node found at a new level.
            result.append([])  # Create that level's output list.
        result[depth].append(node.val)  # Add this node to its level, left to right.
        visit(node.left, depth + 1)  # Visit the left subtree one level deeper.
        visit(node.right, depth + 1)  # Visit the right subtree one level deeper.

    visit(root, 0)  # Start DFS at the root's level, zero.
    return result  # The recursive visits have filled every level in order.


def level_order_bfs(root: Optional[TreeNode]) -> list[list[int]]:
    """Optimized BFS: process exactly the nodes currently waiting at each level.

    How this solution works: freeze the queue size, remove that many nodes for
    this level, and add their children for the next level.

    Time: O(n), because each node enters and leaves the queue once.
    Extra space: O(w) for the queue, excluding the O(n) returned values.
    """
    if root is None:  # An empty tree contains no levels.
        return []  # Return the empty level list immediately.

    result: list[list[int]] = []  # Store each level's values in traversal order.
    queue = deque([root])  # Begin with the root in the first level.

    while queue:  # Continue until there are no more nodes to process.
        level_size = len(queue)  # Freeze the number of nodes in this one level.
        level: list[int] = []  # Collect values from only this level.

        for _ in range(level_size):  # Do not consume children added for the next level.
            node = queue.popleft()  # Take the next node from the current level.
            level.append(node.val)  # Record its value from left to right.
            if node.left is not None:  # Queue a real left child for the next level.
                queue.append(node.left)  # It will be processed after this level ends.
            if node.right is not None:  # Queue a real right child for the next level.
                queue.append(node.right)  # It will be processed after the left child.

        result.append(level)  # Save this completed level before processing the next.

    return result  # All nodes have been grouped by their depth.


class Solution:
    """Expose BFS using the standard judge method name."""

    def levelOrder(self, root: Optional[TreeNode]) -> list[list[int]]:
        return level_order_bfs(root)  # Use the queue approach for the standard solution.
