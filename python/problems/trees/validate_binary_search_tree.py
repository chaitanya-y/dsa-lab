"""Validate Binary Search Tree.

Return whether every node satisfies the strict ordering rules of a BST.

Complexity variables: n = number of nodes; h = tree height.

How to test:
Test file: tests/python/test_validate_binary_search_tree.py
Run: PYTHONDONTWRITEBYTECODE=1 python3 -m unittest -v tests/python/test_validate_binary_search_tree.py
"""

from __future__ import annotations  # TreeNode is supplied by the coding platform.

from typing import Optional  # The tree may be empty.


def _all_nodes_less_than(node: Optional[TreeNode], limit: int) -> bool:
    """Check every node in this subtree is strictly below ``limit``."""
    if node is None:  # An empty subtree contains no violating values.
        return True  # The condition holds for all zero nodes.
    if node.val >= limit:  # One value at or above the limit is invalid.
        return False  # Stop immediately after finding a violation.

    return _all_nodes_less_than(node.left, limit) and _all_nodes_less_than(
        node.right, limit
    )  # Check every descendant, not only the direct child.


def _all_nodes_greater_than(node: Optional[TreeNode], limit: int) -> bool:
    """Check every node in this subtree is strictly above ``limit``."""
    if node is None:  # An empty subtree contains no violating values.
        return True  # The condition holds for all zero nodes.
    if node.val <= limit:  # One value at or below the limit is invalid.
        return False  # Stop immediately after finding a violation.

    return _all_nodes_greater_than(node.left, limit) and _all_nodes_greater_than(
        node.right, limit
    )  # Check every descendant, not only the direct child.


def is_valid_bst_brute_force(root: Optional[TreeNode]) -> bool:
    """Brute force: scan each node's full left and right subtrees repeatedly.

    How this solution works: require all left descendants to be smaller and all
    right descendants to be larger, then repeat those scans for each child node.

    Time: O(n^2) in a skewed tree because the same descendants are checked again.
    Extra space: O(h) for the recursive scans.
    """
    if root is None:  # An empty tree satisfies the BST rules.
        return True  # There are no values that could violate the ordering.
    if not _all_nodes_less_than(root.left, root.val):  # Every left descendant must be smaller.
        return False  # A value in the left subtree violates this node's rule.
    if not _all_nodes_greater_than(root.right, root.val):  # Every right descendant must be larger.
        return False  # A value in the right subtree violates this node's rule.

    return is_valid_bst_brute_force(root.left) and is_valid_bst_brute_force(
        root.right
    )  # Apply the same full-subtree checks to both children.


def is_valid_bst_inorder(root: Optional[TreeNode]) -> bool:
    """Intermediate: inorder traversal of a valid BST must be strictly increasing.

    How this solution works: visit left, node, right using a stack; each visited
    value must be larger than the previous value.

    Time: O(n), because each node is visited once.
    Extra space: O(h) for the traversal stack.
    """
    stack: list[TreeNode] = []  # Hold ancestors while walking down left branches.
    current = root  # Start the inorder walk at the root.
    has_previous = False  # Track whether an earlier value has been visited.
    previous_value = 0  # Store the last value only after the first visit.

    while current is not None or stack:  # Continue while a node or saved ancestor remains.
        while current is not None:  # Keep moving left to find the smallest next value.
            stack.append(current)  # Save this ancestor so it is visited after its left side.
            current = current.left  # Inorder traversal visits left before the node.

        current = stack.pop()  # The next node in sorted order is the last saved ancestor.
        if has_previous and current.val <= previous_value:  # Values must strictly increase.
            return False  # Equal or decreasing values mean this is not a valid BST.
        previous_value = current.val  # Remember this value for the next comparison.
        has_previous = True  # A previous value now exists.
        current = current.right  # Visit the right subtree after this node.

    return True  # The complete inorder sequence increased strictly.


def is_valid_bst_bounds(root: Optional[TreeNode]) -> bool:
    """Optimized: pass each node the strict value range allowed by its ancestors.

    How this solution works: start with (-infinity, infinity); going left lowers
    the upper bound, and going right raises the lower bound.

    Time: O(n), because each node is checked once.
    Extra space: O(h), for recursive calls.
    """
    def valid(node: Optional[TreeNode], lower: float, upper: float) -> bool:
        if node is None:  # An empty branch cannot violate its allowed range.
            return True  # All values in this empty branch are valid.
        if not (lower < node.val < upper):  # The node must satisfy every ancestor's rule.
            return False  # Equality is rejected because BST values must be unique.

        return valid(node.left, lower, node.val) and valid(
            node.right, node.val, upper
        )  # Tighten the allowed range as we descend to each child.

    return valid(root, float("-inf"), float("inf"))  # The root begins without value limits.


class Solution:
    """Expose the range-checking DFS using the standard judge method name."""

    def isValidBST(self, root: Optional[TreeNode]) -> bool:
        return is_valid_bst_bounds(root)  # Use the one-pass ancestor-bounds approach.
