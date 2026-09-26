import importlib.util
import unittest
from pathlib import Path


SOLUTION_PATH = (
    Path(__file__).resolve().parents[2]
    / "python/problems/trees/maximum_depth_of_binary_tree.py"
)


def load_solution_module():
    spec = importlib.util.spec_from_file_location(
        "maximum_depth_of_binary_tree", SOLUTION_PATH
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


def build_tree():
    return TreeNode(1, TreeNode(2, TreeNode(4)), TreeNode(3, None, TreeNode(5)))


class MaximumDepthOfBinaryTreeTests(unittest.TestCase):
    def test_recursive_solution_returns_tree_height(self):
        module = load_solution_module()
        max_depth = get_callable(self, module, "max_depth_recursive")
        self.assertEqual(max_depth(build_tree()), 3)

    def test_iterative_dfs_solution_returns_tree_height(self):
        module = load_solution_module()
        max_depth = get_callable(self, module, "max_depth_dfs_iterative")
        self.assertEqual(max_depth(build_tree()), 3)

    def test_bfs_solution_counts_levels(self):
        module = load_solution_module()
        max_depth = get_callable(self, module, "max_depth_bfs")
        self.assertEqual(max_depth(build_tree()), 3)

    def test_standard_solution_method_uses_recursive_formula(self):
        module = load_solution_module()
        solution_class = getattr(module, "Solution", None)
        self.assertTrue(callable(solution_class), "Expected Solution to be implemented")
        max_depth = get_callable(self, solution_class(), "maxDepth")
        self.assertEqual(max_depth(build_tree()), 3)

    def test_all_approaches_return_zero_for_an_empty_tree(self):
        module = load_solution_module()
        for name in (
            "max_depth_recursive",
            "max_depth_dfs_iterative",
            "max_depth_bfs",
        ):
            with self.subTest(solution=name):
                max_depth = get_callable(self, module, name)
                self.assertEqual(max_depth(None), 0)


if __name__ == "__main__":
    unittest.main()
