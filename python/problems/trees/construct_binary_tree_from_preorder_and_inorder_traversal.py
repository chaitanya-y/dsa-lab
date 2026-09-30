"""Construct Binary Tree from Preorder and Inorder Traversal.

Rebuild the original binary tree from its preorder and inorder value lists.

Complexity variables: n = number of nodes; h = height of the constructed tree.

How to test:
Test file: tests/python/test_construct_binary_tree_from_preorder_and_inorder_traversal.py
Run: PYTHONDONTWRITEBYTECODE=1 python3 -m unittest -v tests/python/test_construct_binary_tree_from_preorder_and_inorder_traversal.py
"""

from __future__ import annotations  # TreeNode is provided by the coding platform.

from typing import Optional  # The reconstructed root may be None for empty input.


def build_tree_brute_force(
    preorder: list[int], inorder: list[int]
) -> Optional[TreeNode]:
    """Brute force: search for each root in inorder and pass copied sublists.

    How this solution works:
    1. The first preorder value is the root of the current subtree.
    2. Search inorder for that root; values before it form the left subtree.
    3. Slice both traversals into left and right parts and solve each part again.

    Time: O(n^2) in the worst case, because searches and copied slices repeat.
    Extra space: O(n^2) worst case for recursive slices, plus O(h) call-stack space.
    """
    if not preorder:  # No preorder values means this subtree is empty.
        return None  # There is no root node to construct.

    root_value = preorder[0]  # Preorder always lists the current root first.
    root_index = inorder.index(root_value)  # Find the root to split inorder in two.
    left_size = root_index  # Values before the root belong to its left subtree.
    root = TreeNode(root_value)  # Create this root using the judge-provided node class.
    root.left = build_tree_brute_force(  # Rebuild the left subtree from its slices.
        preorder[1 : left_size + 1], inorder[:root_index]
    )
    root.right = build_tree_brute_force(  # Rebuild the right subtree from its slices.
        preorder[left_size + 1 :], inorder[root_index + 1 :]
    )
    return root  # Return the complete tree rooted at this node.


def build_tree_with_index_map_and_slices(
    preorder: list[int], inorder: list[int]
) -> Optional[TreeNode]:
    """Intermediate: map inorder positions to avoid searching, but keep slices.

    How this solution works:
    1. Build a map from each unique value to its position in inorder.
    2. Use the map to split each subtree in O(1) lookup time.
    3. Still create preorder slices for recursive calls, so a skewed tree copies
       large overlapping portions repeatedly even though root searches are gone.

    Time: O(n^2) worst case because creating recursive preorder slices is costly.
    Extra space: O(n^2) worst case for those slices, plus the O(n) index map.
    """
    index_by_value = {value: index for index, value in enumerate(inorder)}  # Save every inorder position once.

    def build(preorder_part: list[int], start: int, end: int) -> Optional[TreeNode]:  # Build one inorder range.
        if start > end:  # This range contains no nodes.
            return None  # No subtree belongs here.
        root_value = preorder_part[0]  # The first preorder item roots this subtree.
        root_index = index_by_value[root_value]  # Find its split point without scanning.
        left_size = root_index - start  # Count inorder values assigned to the left subtree.
        root = TreeNode(root_value)  # Create this subtree's root node.
        root.left = build(  # Pass only the left preorder slice and matching inorder range.
            preorder_part[1 : left_size + 1], start, root_index - 1
        )
        root.right = build(  # Pass only the right preorder slice and matching inorder range.
            preorder_part[left_size + 1 :], root_index + 1, end
        )
        return root  # Return both reconstructed child branches under this root.

    return build(preorder, 0, len(inorder) - 1)  # Start with the full inorder range.


def build_tree_optimized(
    preorder: list[int], inorder: list[int]
) -> Optional[TreeNode]:
    """Optimized: use an index map and integer bounds instead of recursive slices.

    How this solution works:
    1. Preorder's current first value is the root.
    2. Look up its inorder position; that position tells us how many left nodes exist.
    3. Recurse over left and right ranges by passing indexes, not new lists.
    4. Each value is processed once, and the ranges identify each subtree exactly.

    Time: O(n), because each node is created and looked up once.
    Extra space: O(n) for the index map and O(h) for recursive calls.
    """
    index_by_value = {value: index for index, value in enumerate(inorder)}  # Precompute root positions.

    def build(  # Build a subtree using ranges into the original preorder and inorder lists.
        preorder_start: int, inorder_start: int, inorder_end: int
    ) -> Optional[TreeNode]:
        if inorder_start > inorder_end:  # The bounds describe an empty subtree.
            return None  # No node needs to be created for an empty range.

        root_value = preorder[preorder_start]  # Preorder starts this subtree with its root.
        root_index = index_by_value[root_value]  # Find where the root divides inorder values.
        left_size = root_index - inorder_start  # Count nodes that belong to the left subtree.
        root = TreeNode(root_value)  # Make this subtree's root node.
        root.left = build(  # Left root is next in preorder; left inorder range ends before root.
            preorder_start + 1, inorder_start, root_index - 1
        )
        root.right = build(  # Right root follows all left nodes in preorder.
            preorder_start + left_size + 1, root_index + 1, inorder_end
        )
        return root  # Attachments are complete, so return this subtree.

    return build(0, 0, len(inorder) - 1)  # Begin with both traversals' full ranges.


class Solution:
    """Expose the index-range method using the standard judge method name."""

    def buildTree(self, preorder: list[int], inorder: list[int]) -> Optional[TreeNode]:
        """Reconstruct the tree without copying traversal slices."""
        return build_tree_optimized(preorder, inorder)  # Use the linear-time approach.
