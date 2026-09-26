"""Invert Binary Tree.

Given a binary tree, swap the left and right child of every node and return its root.
All approaches modify the given tree in place.

Complexity variables: n = number of nodes; h = tree height; w = maximum tree width.

How to test:
Test file: tests/python/test_invert_binary_tree.py
Run: PYTHONDONTWRITEBYTECODE=1 python3 -m unittest -v tests/python/test_invert_binary_tree.py
"""

from __future__ import annotations  # Allow the judge-provided TreeNode type in hints.

from collections import deque  # Provide an efficient queue for breadth-first search.
from typing import Optional  # A tree can be empty, so its root may be None.


def invert_tree_recursive(root: Optional[TreeNode]) -> Optional[TreeNode]:
    """Recursive DFS: swap each node's children, then invert both subtrees.

    How this solution works:
    1. An empty node has nothing to swap, so return None.
    2. Swap this node's left and right child.
    3. Recursively apply the same steps to both children.
    4. Return the original root, whose descendants are now inverted.

    Time: O(n), because each node is visited once.
    Extra space: O(h), for recursive calls along the tree height.
    """
    if root is None:  # Stop at an empty child; there is nothing to invert.
        return None  # An empty subtree remains empty.

    root.left, root.right = root.right, root.left  # Mirror this node by swapping its children.
    invert_tree_recursive(root.left)  # Invert the subtree now on the left.
    invert_tree_recursive(root.right)  # Invert the subtree now on the right.
    return root  # Return the root of the fully inverted tree.


def invert_tree_dfs_iterative(root: Optional[TreeNode]) -> Optional[TreeNode]:
    """Iterative DFS: use a stack to visit and swap every node.

    How this solution works:
    1. Put the root on a stack; an empty root means there is no work.
    2. Pop one node and swap its left and right children.
    3. Put its non-empty children on the stack to process them later.
    4. Continue until the stack is empty.

    Time: O(n), because each node is visited once.
    Extra space: O(h) for the DFS stack, up to O(n) in the worst case.
    """
    if root is None:  # There is no node to process in an empty tree.
        return None  # Return the empty tree unchanged.

    stack = [root]  # Start DFS with the root waiting to be processed.

    while stack:  # Continue until every reachable node has been handled.
        node = stack.pop()  # Take the next node from the top of the stack.
        node.left, node.right = node.right, node.left  # Swap this node's children.

        if node.left is not None:  # Visit the left child after the swap.
            stack.append(node.left)  # Add it to the DFS worklist.
        if node.right is not None:  # Visit the right child after the swap.
            stack.append(node.right)  # Add it to the DFS worklist.

    return root  # The same root now points to the inverted tree.


def invert_tree_bfs(root: Optional[TreeNode]) -> Optional[TreeNode]:
    """BFS: use a queue to swap nodes level by level.

    How this solution works:
    1. Put the root in a queue; an empty tree returns immediately.
    2. Remove the next node and swap its left and right children.
    3. Add its non-empty children to the queue.
    4. Continue in level order until the queue is empty.

    Time: O(n), because each node is visited once.
    Extra space: O(w), where w is the maximum number of nodes on a level.
    """
    if root is None:  # There is no node to process in an empty tree.
        return None  # Return the empty tree unchanged.

    queue = deque([root])  # Start level-order traversal with the root.

    while queue:  # Continue until no nodes remain at any level.
        node = queue.popleft()  # Take the earliest discovered node.
        node.left, node.right = node.right, node.left  # Swap this node's children.

        if node.left is not None:  # Queue the left child after swapping.
            queue.append(node.left)  # It will be handled later in level order.
        if node.right is not None:  # Queue the right child after swapping.
            queue.append(node.right)  # It will be handled later in level order.

    return root  # The root still leads to the same tree, now mirrored.


class Solution:
    """Expose the recursive version with the standard interview-platform method name."""

    def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        """Call the recursive DFS implementation used by the standard signature."""
        return invert_tree_recursive(root)  # Keep one source of truth for this approach.
