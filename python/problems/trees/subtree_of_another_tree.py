"""Subtree of Another Tree.

Return whether ``subRoot`` matches a node in ``root`` in both values and shape.

Complexity variables: n = number of nodes in ``root``; m = number of nodes in
``subRoot``; h = maximum height of either tree.

How to test:
Test file: tests/python/test_subtree_of_another_tree.py
Run: PYTHONDONTWRITEBYTECODE=1 python3 -m unittest -v tests/python/test_subtree_of_another_tree.py
"""

from __future__ import annotations  # TreeNode is supplied by the coding platform.

from typing import Optional  # Either tree root may be empty.


def _same_tree(first: Optional[TreeNode], second: Optional[TreeNode]) -> bool:
    """Compare two trees at matching positions, including their shapes."""
    if first is None and second is None:  # Both positions are empty.
        return True  # These branches match.
    if first is None or second is None:  # Only one position has a node.
        return False  # The tree shapes differ.
    if first.val != second.val:  # Nodes at the same position need equal values.
        return False  # A value difference means the trees do not match.

    return _same_tree(first.left, second.left) and _same_tree(
        first.right, second.right
    )  # Both corresponding child pairs must match.


def is_subtree_dfs(
    root: Optional[TreeNode], sub_root: Optional[TreeNode]
) -> bool:
    """Simple DFS: test each node in ``root`` as a possible subtree root.

    How we solve it:
    1. An empty ``sub_root`` matches; a non-empty ``sub_root`` cannot fit in an
       empty ``root``.
    2. Use the Same Tree check to compare the trees starting at these roots.
    3. If they do not match, repeat the search in ``root``'s left and right trees.

    Time: O(n * m) in the worst case because up to m nodes may be compared at
    each of the n possible starting nodes.
    Extra space: O(h), for the nested DFS calls.
    """
    if sub_root is None:  # An empty tree is considered a subtree of any tree.
        return True  # Nothing needs to be found inside root.
    if root is None:  # A non-empty tree cannot appear inside an empty tree.
        return False  # There is no node to match against sub_root.
    if _same_tree(root, sub_root):  # Test whether this exact root starts a match.
        return True  # Both the values and full structure match here.

    return is_subtree_dfs(root.left, sub_root) or is_subtree_dfs(
        root.right, sub_root
    )  # Otherwise search both child trees for another possible start.


def _serialize_preorder(root: Optional[TreeNode]) -> list[int | None]:
    """Turn a tree into preorder tokens, including markers for empty children."""
    tokens: list[int | None] = []  # Store node values and explicit empty-child markers.
    pending = [root]  # A stack lets us write preorder without recursive calls.

    while pending:  # Continue until every node and empty child is represented.
        node = pending.pop()  # Read the next position in preorder.
        if node is None:  # Empty children must be present to preserve the shape.
            tokens.append(None)  # None cannot be confused with an integer node value.
            continue  # An empty position has no children to add.

        tokens.append(node.val)  # Record this node before visiting either child.
        pending.append(node.right)  # Push right first so left is processed first.
        pending.append(node.left)  # Preorder visits the left child before the right.

    return tokens  # The full token sequence uniquely describes values and shape.


def is_subtree_serialized_brute_force(
    root: Optional[TreeNode], sub_root: Optional[TreeNode]
) -> bool:
    """Intermediate: serialize both trees, then compare every possible slice.

    How we solve it:
    1. Encode each tree in preorder, writing None for every empty child.
    2. Slide the subRoot token sequence across root's token sequence.
    3. Return true if one complete slice matches.
    The explicit empty-child markers prevent a shape mismatch from looking equal.

    Time: O(n * m) in the worst case, for trying each possible token position.
    Extra space: O(n + m), for the two serialized trees.
    """
    if sub_root is None:  # The empty tree is always contained.
        return True  # This boundary case needs no serialization.
    if root is None:  # A non-empty tree cannot fit inside an empty tree.
        return False  # There are no tokens that could match subRoot.

    root_tokens = _serialize_preorder(root)  # Convert the larger tree to tokens.
    sub_tokens = _serialize_preorder(sub_root)  # Convert the candidate tree likewise.
    last_start = len(root_tokens) - len(sub_tokens)  # Later positions cannot fit the pattern.

    for start in range(last_start + 1):  # Try each starting position that can fit all tokens.
        matches = True  # Assume this position matches until a token differs.
        for offset in range(len(sub_tokens)):  # Compare the candidate tokens in order.
            if root_tokens[start + offset] != sub_tokens[offset]:  # Check one value or null marker.
                matches = False  # This starting position does not contain the candidate.
                break  # No need to inspect the rest of a known mismatch.
        if matches:  # Every value and shape marker matched at this position.
            return True  # The serialized candidate occurs in the larger tree.

    return False  # No possible starting position contained all candidate tokens.


def _build_lps(pattern: list[int | None]) -> list[int]:
    """Build KMP's longest-prefix/suffix table for the token pattern."""
    lps = [0] * len(pattern)  # lps[i] stores the reusable prefix length through i.
    prefix_length = 0  # Track the current matching prefix's length.
    index = 1  # The first token has no earlier prefix to compare against.

    while index < len(pattern):  # Build the table from left to right.
        if pattern[index] == pattern[prefix_length]:  # Extend the current prefix.
            prefix_length += 1  # One more token is shared by prefix and suffix.
            lps[index] = prefix_length  # Save how much can be reused after a mismatch.
            index += 1  # Continue to the next pattern token.
        elif prefix_length > 0:  # A mismatch may still have a shorter reusable prefix.
            prefix_length = lps[prefix_length - 1]  # Fall back without rechecking tokens.
        else:  # No prefix can be reused at this position.
            lps[index] = 0  # Record that the next search must restart from the beginning.
            index += 1  # Continue building the remaining table entries.

    return lps  # KMP uses this table to avoid rescanning matched tokens.


def _contains_tokens_kmp(text: list[int | None], pattern: list[int | None]) -> bool:
    """Search one token sequence in another without backing up in the text."""
    lps = _build_lps(pattern)  # Prepare the pattern's fallback positions once.
    text_index = 0  # Track the next text token to compare.
    pattern_index = 0  # Track how many consecutive pattern tokens currently match.

    while text_index < len(text):  # Each text token is advanced at most once by KMP.
        if text[text_index] == pattern[pattern_index]:  # The current tokens match.
            text_index += 1  # Move forward in the serialized root.
            pattern_index += 1  # Move forward in the serialized candidate.
            if pattern_index == len(pattern):  # Every candidate token has matched.
                return True  # The complete candidate serialization occurs in the root.
        elif pattern_index > 0:  # Reuse a matching prefix after a mismatch.
            pattern_index = lps[pattern_index - 1]  # Keep text_index where it is.
        else:  # No pattern token matched, so this text token cannot start a match.
            text_index += 1  # Try the next text token as a possible start.

    return False  # The full pattern was never found in the text.


def is_subtree_kmp(root: Optional[TreeNode], sub_root: Optional[TreeNode]) -> bool:
    """Optimized: serialize both trees and search using KMP.

    How we solve it: serialize with explicit None markers, then use KMP's prefix
    table to skip repeated comparisons while looking for the candidate sequence.

    Time: O(n + m), to serialize both trees and scan their token sequences.
    Extra space: O(n + m), for serialized tokens and KMP's prefix table.
    """
    if sub_root is None:  # The empty tree is always a subtree.
        return True  # Return before building the token sequences.
    if root is None:  # A non-empty candidate cannot match an empty tree.
        return False  # No serialization can contain the candidate.

    root_tokens = _serialize_preorder(root)  # Encode all values and child positions.
    sub_tokens = _serialize_preorder(sub_root)  # Encode the tree we are searching for.
    return _contains_tokens_kmp(root_tokens, sub_tokens)  # Search in linear time.


class Solution:
    """Expose the simple recursive DFS using the standard judge method name."""

    def isSubtree(
        self, root: Optional[TreeNode], subRoot: Optional[TreeNode]
    ) -> bool:
        if subRoot is None:  # An empty candidate is always a subtree.
            return True  # Match the expected empty-tree behavior.
        if root is None:  # A non-empty candidate cannot fit in an empty tree.
            return False  # There is nowhere to begin the search.
        if self.sameTree(root, subRoot):  # Compare this root with the candidate.
            return True  # The values and shape match exactly.

        return self.isSubtree(root.left, subRoot) or self.isSubtree(
            root.right, subRoot
        )  # Search the left and right branches for another match.

    def sameTree(
        self, root: Optional[TreeNode], subRoot: Optional[TreeNode]
    ) -> bool:
        """Return whether two trees have the same values and the same shape."""
        return _same_tree(root, subRoot)  # Share the tested structural comparison.
