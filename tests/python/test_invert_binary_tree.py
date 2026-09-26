import importlib.util
import unittest
from pathlib import Path


SOLUTION_PATH = (
    Path(__file__).resolve().parents[2]
    / "python/problems/trees/invert_binary_tree.py"
)


def load_solution_module():
    spec = importlib.util.spec_from_file_location("invert_binary_tree", SOLUTION_PATH)
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
    return TreeNode(
        4,
        TreeNode(2, TreeNode(1), TreeNode(3)),
        TreeNode(7, TreeNode(6), TreeNode(9)),
    )


def tree_shape(node):
    if node is None:
        return None
    return (node.val, tree_shape(node.left), tree_shape(node.right))


EXPECTED_INVERTED = (
    4,
    (7, (9, None, None), (6, None, None)),
    (2, (3, None, None), (1, None, None)),
)


class InvertBinaryTreeTests(unittest.TestCase):
    def test_recursive_dfs_swaps_every_node(self):
        module = load_solution_module()
        invert = get_callable(self, module, "invert_tree_recursive")
        self.assertEqual(tree_shape(invert(build_tree())), EXPECTED_INVERTED)

    def test_iterative_dfs_swaps_every_node(self):
        module = load_solution_module()
        invert = get_callable(self, module, "invert_tree_dfs_iterative")
        self.assertEqual(tree_shape(invert(build_tree())), EXPECTED_INVERTED)

    def test_bfs_swaps_every_node(self):
        module = load_solution_module()
        invert = get_callable(self, module, "invert_tree_bfs")
        self.assertEqual(tree_shape(invert(build_tree())), EXPECTED_INVERTED)

    def test_standard_solution_method_uses_recursive_approach(self):
        module = load_solution_module()
        solution_class = getattr(module, "Solution", None)
        self.assertTrue(callable(solution_class), "Expected Solution to be implemented")
        invert = get_callable(self, solution_class(), "invertTree")
        self.assertEqual(tree_shape(invert(build_tree())), EXPECTED_INVERTED)

    def test_all_approaches_handle_an_empty_tree(self):
        module = load_solution_module()
        for name in (
            "invert_tree_recursive",
            "invert_tree_dfs_iterative",
            "invert_tree_bfs",
        ):
            with self.subTest(solution=name):
                invert = get_callable(self, module, name)
                self.assertIsNone(invert(None))


if __name__ == "__main__":
    unittest.main()
