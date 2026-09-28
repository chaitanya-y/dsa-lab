"""Lowest Common Ancestor of a Binary Search Tree.

Find the deepest node that is an ancestor of both target nodes.

Complexity variables: n = number of nodes; h = height of the BST.

How to test:
Test file: tests/python/test_lowest_common_ancestor_of_a_binary_search_tree.py
Run: PYTHONDONTWRITEBYTECODE=1 python3 -m unittest -v tests/python/test_lowest_common_ancestor_of_a_binary_search_tree.py
"""

from __future__ import annotations  # TreeNode is supplied by the coding platform.

from typing import Optional  # A path search may fail if a target is absent.


def _find_path_dfs(
    node: Optional[TreeNode], target: TreeNode, path: list[TreeNode]
) -> bool:
    """Record the path to a target using ordinary DFS, without using BST order."""
    if node is None:  # An empty branch cannot contain the target.
        return False  # Tell the caller to try another branch.

    path.append(node)  # This node is part of the current route from the root.
    if node is target:  # The target node itself has been reached.
        return True  # Keep the complete path in the list.
    if _find_path_dfs(node.left, target, path):  # Search the left child first.
        return True  # Do not remove nodes from a successful path.
    if _find_path_dfs(node.right, target, path):  # Search the right child next.
        return True  # The target is on this route.

    path.pop()  # This node was not on the target's path, so backtrack.
    return False  # Tell the caller this branch did not contain the target.


def lowest_common_ancestor_brute_force(
    root: Optional[TreeNode], p: TreeNode, q: TreeNode
) -> Optional[TreeNode]:
    """Brute force: find both root-to-node paths, then keep their shared prefix.

    This works for a general binary tree, but ignores the faster BST ordering.

    Time: O(n), because DFS may inspect every node twice.
    Extra space: O(h), for the two paths and the DFS call stack.
    """
    path_to_p: list[TreeNode] = []  # Save the route from root to p.
    path_to_q: list[TreeNode] = []  # Save the route from root to q.
    if not _find_path_dfs(root, p, path_to_p):  # Find p without assuming BST order.
        return None  # No common ancestor exists if p is not in this tree.
    if not _find_path_dfs(root, q, path_to_q):  # Find q using a second DFS.
        return None  # No common ancestor exists if q is not in this tree.

    ancestor = None  # Remember the last node shared by both root paths.
    for node_p, node_q in zip(path_to_p, path_to_q):  # Compare paths from the root down.
        if node_p is not node_q:  # The first different node ends the shared prefix.
            break  # Deeper nodes cannot be common ancestors after paths split.
        ancestor = node_p  # This node is shared, so it is the latest candidate.

    return ancestor  # Return the deepest node on both paths.


def lowest_common_ancestor_recursive(
    root: Optional[TreeNode], p: TreeNode, q: TreeNode
) -> Optional[TreeNode]:
    """Recursive BST search: follow the one branch containing both targets.

    How we solve it: if both values are smaller, go left; if both are larger,
    go right; when they split sides (or one equals this node), this node is LCA.

    Time: O(h), because each step moves down only one BST branch.
    Extra space: O(h), for recursive calls.
    """
    if root is None:  # This branch has no node that can be their ancestor.
        return None  # Also handles a target that is not present.
    if p.val < root.val and q.val < root.val:  # Both targets are smaller than root.
        return lowest_common_ancestor_recursive(root.left, p, q)  # Their LCA is left.
    if p.val > root.val and q.val > root.val:  # Both targets are larger than root.
        return lowest_common_ancestor_recursive(root.right, p, q)  # Their LCA is right.

    return root  # The paths split here, or root is one of the targets.


def lowest_common_ancestor_iterative(
    root: Optional[TreeNode], p: TreeNode, q: TreeNode
) -> Optional[TreeNode]:
    """Optimized: apply the BST split rule iteratively with constant extra space.

    Time: O(h), because the current node moves down at most one root-to-leaf path.
    Extra space: O(1), because no recursion stack or path arrays are needed.
    """
    current = root  # Start searching from the tree's root.

    while current is not None:  # Stop at the split point or an empty branch.
        if p.val > current.val and q.val > current.val:  # Both targets are on the right.
            current = current.right  # Only the right branch can contain their LCA.
        elif p.val < current.val and q.val < current.val:  # Both targets are on the left.
            current = current.left  # Only the left branch can contain their LCA.
        else:  # The targets split sides, or one target equals current.
            return current  # This first split point is their lowest common ancestor.

    return None  # The targets were not both found below the supplied root.


class Solution:
    """Expose the iterative BST solution with the standard judge method name."""

    def lowestCommonAncestor(
        self, root: Optional[TreeNode], p: TreeNode, q: TreeNode
    ) -> Optional[TreeNode]:
        return lowest_common_ancestor_iterative(root, p, q)  # Keep the optimized method reusable.
