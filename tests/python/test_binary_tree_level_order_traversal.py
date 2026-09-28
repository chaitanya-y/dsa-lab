import importlib.util
import unittest
from pathlib import Path


SOLUTION_PATH = (
    Path(__file__).resolve().parents[2]
    / "python/problems/trees/binary_tree_level_order_traversal.py"
)


def load_solution_module():
    spec = importlib.util.spec_from_file_location(
        "binary_tree_level_order_traversal", SOLUTION_PATH
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


class BinaryTreeLevelOrderTraversalTests(unittest.TestCase):
    def test_all_approaches_return_values_grouped_by_level(self):
        module = load_solution_module()
        brute_force = get_callable(self, module, "level_order_brute_force")
        recursive_dfs = get_callable(self, module, "level_order_dfs")
        solution_class = getattr(module, "Solution", None)
        self.assertTrue(callable(solution_class), "Expected Solution to be implemented")
        bfs = get_callable(self, solution_class(), "levelOrder")

        for traverse in (brute_force, recursive_dfs, bfs):
            with self.subTest(solution=traverse.__name__):
                self.assertEqual(traverse(build_tree()), [[1], [2, 3], [4, 5]])

    def test_all_approaches_return_an_empty_list_for_an_empty_tree(self):
        module = load_solution_module()
        functions = (
            get_callable(self, module, "level_order_brute_force"),
            get_callable(self, module, "level_order_dfs"),
            get_callable(self, getattr(module, "Solution")(), "levelOrder"),
        )
        for traverse in functions:
            with self.subTest(solution=traverse.__name__):
                self.assertEqual(traverse(None), [])


if __name__ == "__main__":
    unittest.main()
