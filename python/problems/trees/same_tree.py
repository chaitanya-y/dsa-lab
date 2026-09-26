"""Same Tree.

Given the roots of two binary trees, decide whether their values and shapes match.

Complexity variables: n = number of nodes in the trees; h = maximum tree height;
w = maximum number of nodes on one level.

How to test:
Test file: tests/python/test_same_tree.py
Run: PYTHONDONTWRITEBYTECODE=1 python3 -m unittest -v tests/python/test_same_tree.py
"""

from __future__ import annotations  # Let type hints refer to judge-provided TreeNode.

from collections import deque  # Provide a first-in, first-out queue for BFS.
from typing import Optional  # Either tree root can be empty.


def is_same_tree_recursive(p: Optional[TreeNode], q: Optional[TreeNode]) -> bool:
    """Recursive DFS: compare matching positions in both trees.

    How we solve it:
    1. If both current nodes are empty, this pair of branches matches.
    2. If exactly one is empty, their shapes differ; if values differ, they differ.
    3. Otherwise compare the left children and right children in the same way.

    Time: O(n), where n is the number of nodes compared before a mismatch.
    Extra space: O(h), where h is the deeper tree's height due to recursion.
    """
    if p is None and q is None:  # Two empty positions match exactly.
        return True  # There is no value or child-shape difference here.
    if p is None or q is None:  # Only one empty position means different shapes.
        return False  # One tree has a node where the other tree does not.
    if p.val != q.val:  # Nodes at the same position must contain equal values.
        return False  # A value mismatch makes the trees different.

    return is_same_tree_recursive(p.left, q.left) and is_same_tree_recursive(
        p.right, q.right
    )  # Both corresponding subtrees must match.


def is_same_tree_dfs_iterative(p: Optional[TreeNode], q: Optional[TreeNode]) -> bool:
    """Iterative DFS: compare pairs of nodes using an explicit stack.

    How we solve it:
    1. Put the pair of roots on a stack.
    2. Pop a pair; check whether both are empty, only one is empty, or values differ.
    3. If they match, push their left-child pair and right-child pair.
    4. If every pair matches, the trees are the same.

    Time: O(n), where n is the number of nodes compared.
    Extra space: O(h) on a balanced tree and O(n) in the worst case.
    """
    pending = [(p, q)]  # Each item holds two nodes at corresponding tree positions.

    while pending:  # Continue until every discovered pair has been checked.
        first, second = pending.pop()  # Take one pair; a stack gives depth-first order.

        if first is None and second is None:  # Two empty child positions match.
            continue  # There is no work below these positions.
        if first is None or second is None:  # Only one side has a node.
            return False  # The tree shapes do not match.
        if first.val != second.val:  # Values at corresponding positions must match.
            return False  # Stop as soon as one value differs.

        pending.append((first.left, second.left))  # Compare the left sides next.
        pending.append((first.right, second.right))  # Also compare the right sides.

    return True  # No pair differed, so the trees match in values and shape.


def is_same_tree_bfs(p: Optional[TreeNode], q: Optional[TreeNode]) -> bool:
    """BFS: compare corresponding nodes level by level with a queue.

    How we solve it:
    1. Put the root pair in a queue.
    2. Remove a pair and perform the same empty/value checks.
    3. For matching nodes, enqueue their left pair and right pair.
    4. If the queue empties without a mismatch, the trees are the same.

    Time: O(n), where n is the number of nodes compared.
    Extra space: O(w), where w is the maximum number of paired nodes on a level.
    """
    pending = deque([(p, q)])  # The queue processes matching positions level by level.

    while pending:  # Continue until every discovered pair has been checked.
        first, second = pending.popleft()  # Take the earliest pair in breadth-first order.

        if first is None and second is None:  # Two empty child positions match.
            continue  # No descendants need to be added for this pair.
        if first is None or second is None:  # One node exists where the other is absent.
            return False  # Their shapes are different.
        if first.val != second.val:  # Matching positions must have matching values.
            return False  # A single value mismatch is enough to reject.

        pending.append((first.left, second.left))  # Compare the left children later.
        pending.append((first.right, second.right))  # Compare the right children later.

    return True  # Every corresponding value and child position matched.


class Solution:
    """Expose the recursive DFS under the standard judge method name."""

    def isSameTree(self, p: Optional[TreeNode], q: Optional[TreeNode]) -> bool:
        return is_same_tree_recursive(p, q)  # Use the simple recursive comparison.
