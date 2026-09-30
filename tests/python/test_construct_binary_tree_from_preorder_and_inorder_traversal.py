import importlib.util
import unittest
from pathlib import Path


SOLUTION_PATH = (
    Path(__file__).resolve().parents[2]
    / "python/problems/trees/construct_binary_tree_from_preorder_and_inorder_traversal.py"
)


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


def load_solution_module():
    spec = importlib.util.spec_from_file_location(
        "construct_binary_tree_from_preorder_and_inorder_traversal", SOLUTION_PATH
    )
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    module.TreeNode = TreeNode
    return module


def get_callable(test_case, owner, name):
    function = getattr(owner, name, None)
    test_case.assertTrue(callable(function), f"Expected {name} to be implemented")
    return function


def tree_shape(root):
    if root is None:
        return None
    return (root.val, tree_shape(root.left), tree_shape(root.right))


class ConstructBinaryTreeFromPreorderAndInorderTraversalTests(unittest.TestCase):
    def test_all_approaches_reconstruct_the_expected_tree(self):
        module = load_solution_module()
        preorder = [3, 9, 20, 15, 7]
        inorder = [9, 3, 15, 20, 7]
        expected = (3, (9, None, None), (20, (15, None, None), (7, None, None)))

        for build_tree in self.get_approaches(module):
            with self.subTest(solution=build_tree.__name__):
                self.assertEqual(tree_shape(build_tree(preorder, inorder)), expected)

    def test_all_approaches_build_a_right_skewed_tree(self):
        module = load_solution_module()
        preorder = [1, 2, 3]
        inorder = [1, 2, 3]
        expected = (1, None, (2, None, (3, None, None)))

        for build_tree in self.get_approaches(module):
            with self.subTest(solution=build_tree.__name__):
                self.assertEqual(tree_shape(build_tree(preorder, inorder)), expected)

    def test_all_approaches_return_none_for_empty_traversals(self):
        module = load_solution_module()
        for build_tree in self.get_approaches(module):
            with self.subTest(solution=build_tree.__name__):
                self.assertIsNone(build_tree([], []))

    def test_standard_solution_method_uses_the_index_range_approach(self):
        module = load_solution_module()
        solution_class = getattr(module, "Solution", None)
        self.assertTrue(callable(solution_class), "Expected Solution to be implemented")
        build_tree = get_callable(self, solution_class(), "buildTree")
        self.assertEqual(
            tree_shape(build_tree([1, 2], [1, 2])),
            (1, None, (2, None, None)),
        )

    def get_approaches(self, module):
        return (
            get_callable(self, module, "build_tree_brute_force"),
            get_callable(self, module, "build_tree_with_index_map_and_slices"),
            get_callable(self, module, "build_tree_optimized"),
        )


if __name__ == "__main__":
    unittest.main()
