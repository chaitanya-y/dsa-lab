import importlib.util
import unittest
from pathlib import Path


SOLUTION_PATH = (
    Path(__file__).resolve().parents[2] / "python/problems/trees/same_tree.py"
)


def load_solution_module():
    spec = importlib.util.spec_from_file_location("same_tree", SOLUTION_PATH)
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


def matching_trees():
    return (
        TreeNode(1, TreeNode(2), TreeNode(3, TreeNode(4))),
        TreeNode(1, TreeNode(2), TreeNode(3, TreeNode(4))),
    )


class SameTreeTests(unittest.TestCase):
    def test_recursive_dfs_compares_matching_trees(self):
        module = load_solution_module()
        compare = get_callable(self, module, "is_same_tree_recursive")
        self.assertTrue(compare(*matching_trees()))

    def test_iterative_dfs_detects_different_values_and_shapes(self):
        module = load_solution_module()
        compare = get_callable(self, module, "is_same_tree_dfs_iterative")
        self.assertFalse(compare(TreeNode(1, TreeNode(2)), TreeNode(1, TreeNode(3))))
        self.assertFalse(compare(TreeNode(1, TreeNode(2)), TreeNode(1, None, TreeNode(2))))

    def test_bfs_compares_matching_trees(self):
        module = load_solution_module()
        compare = get_callable(self, module, "is_same_tree_bfs")
        self.assertTrue(compare(*matching_trees()))

    def test_standard_solution_method_handles_empty_and_mismatched_trees(self):
        module = load_solution_module()
        solution_class = getattr(module, "Solution", None)
        self.assertTrue(callable(solution_class), "Expected Solution to be implemented")
        compare = get_callable(self, solution_class(), "isSameTree")
        self.assertTrue(compare(None, None))
        self.assertFalse(compare(TreeNode(1), None))


if __name__ == "__main__":
    unittest.main()
