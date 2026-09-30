"""Kth Smallest Element in a BST.

Return the value that would appear at position k if the BST values were sorted.

Complexity variables: n = number of nodes; h = tree height; k = requested position.

How to test:
Test file: tests/python/test_kth_smallest_element_in_a_bst.py
Run: PYTHONDONTWRITEBYTECODE=1 python3 -m unittest -v tests/python/test_kth_smallest_element_in_a_bst.py
"""

from __future__ import annotations  # TreeNode is provided by the coding platform.

from typing import Optional  # The input tree can be empty in helper calls.


def kth_smallest_brute_force(root: Optional[TreeNode], k: int) -> int:
    """Brute force: collect every value, sort them, then read position k.

    How this solution works:
    1. Walk through the whole tree and save each value in a list.
    2. Sort that list from smallest to largest.
    3. Return the value at index k - 1 (Python lists start at index zero).

    Time: O(n log n), because sorting n collected values takes O(n log n).
    Extra space: O(n), for the list containing all node values.
    """
    values: list[int] = []  # Keep one place to collect all values from the tree.

    def collect(node: Optional[TreeNode]) -> None:  # Visit and save every tree node.
        if node is None:  # An empty branch has no value to add.
            return  # Stop this branch of the traversal.
        values.append(node.val)  # Save this node's value for sorting later.
        collect(node.left)  # Visit every node in the left subtree.
        collect(node.right)  # Visit every node in the right subtree.

    collect(root)  # Start collecting from the root node.
    values.sort()  # Sort all values so the kth smallest is at index k - 1.
    return values[k - 1]  # Convert the one-based k position to a zero-based index.


def kth_smallest_inorder(root: Optional[TreeNode], k: int) -> int:
    """Intermediate: use inorder traversal to produce all BST values in order.

    How this solution works:
    1. Inorder means visit left subtree, current node, then right subtree.
    2. In a BST, that traversal visits values from smallest to largest.
    3. Save the complete traversal and return its value at index k - 1.

    Time: O(n), because each of the n nodes is visited once.
    Extra space: O(n) for the complete traversal list, plus O(h) call-stack space.
    """
    values: list[int] = []  # Store the values in sorted inorder order.

    def visit_inorder(node: Optional[TreeNode]) -> None:  # Visit left, node, right.
        if node is None:  # An empty branch contributes no values.
            return  # Finish this branch before returning to its parent.
        visit_inorder(node.left)  # Smaller BST values come before this node.
        values.append(node.val)  # Save this value after its left subtree.
        visit_inorder(node.right)  # Larger BST values come after this node.

    visit_inorder(root)  # Build the full sorted order starting at the root.
    return values[k - 1]  # The kth smallest value is at zero-based index k - 1.


def kth_smallest_optimized(root: Optional[TreeNode], k: int) -> int:
    """Optimized: stop an iterative inorder walk as soon as node k is reached.

    How this solution works:
    1. Use a stack to walk down the left side to the next smallest node.
    2. Pop one node, count it, and return immediately when the count is k.
    3. Continue with that node's right subtree only when more values are needed.

    Time: O(h + k), reaching the first value takes up to h steps and then k nodes
    are visited. Extra space: O(h), for the stack of ancestors.
    """
    stack: list[TreeNode] = []  # Hold ancestors until their left sides are visited.
    current = root  # Start the inorder walk at the root.
    visited_count = 0  # Count nodes in increasing-value order.

    while current is not None or stack:  # Continue while nodes remain to process.
        while current is not None:  # Move left to find the next smallest value.
            stack.append(current)  # Save this node until its left subtree is done.
            current = current.left  # Inorder visits left before the current node.

        current = stack.pop()  # The last saved node is next in sorted order.
        visited_count += 1  # Count this value's one-based sorted position.
        if visited_count == k:  # This is the requested position.
            return current.val  # Stop early without visiting larger values.
        current = current.right  # Larger values are found in the right subtree.

    return -1  # The problem guarantees valid k; this fallback covers invalid input.


class Solution:
    """Expose the early-stop inorder traversal with the standard judge signature."""

    def kthSmallest(self, root: Optional[TreeNode], k: int) -> int:
        """Return the kth smallest value using the optimized traversal."""
        return kth_smallest_optimized(root, k)  # Keep the optimized logic in one place.
