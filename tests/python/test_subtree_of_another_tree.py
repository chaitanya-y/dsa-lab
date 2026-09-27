import importlib.util
import unittest
from pathlib import Path


SOLUTION_PATH = (
    Path(__file__).resolve().parents[2]
    / "python/problems/trees/subtree_of_another_tree.py"
)


def load_solution_module():
    spec = importlib.util.spec_from_file_location(
        "subtree_of_another_tree", SOLUTION_PATH
    )
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def get_callable(test_case, owner, name):
    function = getattr(owner, name, None)
    test_case.assertTrue(callable(function), f"Expected {name} to be implemented")
    return function


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


def example_trees():
    root = TreeNode(3, TreeNode(4, TreeNode(1), TreeNode(2)), TreeNode(5))
    matching_subtree = TreeNode(4, TreeNode(1), TreeNode(2))
    different_shape = TreeNode(4, TreeNode(1))
    return root, matching_subtree, different_shape


class SubtreeOfAnotherTreeTests(unittest.TestCase):
    def test_dfs_finds_a_matching_subtree_and_rejects_a_shape_mismatch(self):
        module = load_solution_module()
        is_subtree = get_callable(self, module, "is_subtree_dfs")
        root, matching_subtree, different_shape = example_trees()
        self.assertTrue(is_subtree(root, matching_subtree))
        self.assertFalse(is_subtree(root, different_shape))

    def test_serialized_brute_force_finds_and_rejects_subtrees(self):
        module = load_solution_module()
        is_subtree = get_callable(self, module, "is_subtree_serialized_brute_force")
        root, matching_subtree, different_shape = example_trees()
        self.assertTrue(is_subtree(root, matching_subtree))
        self.assertFalse(is_subtree(root, different_shape))

    def test_kmp_finds_and_rejects_subtrees(self):
        module = load_solution_module()
        is_subtree = get_callable(self, module, "is_subtree_kmp")
        root, matching_subtree, different_shape = example_trees()
        self.assertTrue(is_subtree(root, matching_subtree))
        self.assertFalse(is_subtree(root, different_shape))

    def test_standard_solution_handles_empty_trees(self):
        module = load_solution_module()
        solution_class = getattr(module, "Solution", None)
        self.assertTrue(callable(solution_class), "Expected Solution to be implemented")
        is_subtree = get_callable(self, solution_class(), "isSubtree")
        self.assertTrue(is_subtree(TreeNode(1), None))
        self.assertFalse(is_subtree(None, TreeNode(1)))


if __name__ == "__main__":
    unittest.main()
