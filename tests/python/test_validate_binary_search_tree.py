import importlib.util
import unittest
from pathlib import Path


SOLUTION_PATH = (
    Path(__file__).resolve().parents[2]
    / "python/problems/trees/validate_binary_search_tree.py"
)


def load_solution_module():
    spec = importlib.util.spec_from_file_location("validate_binary_search_tree", SOLUTION_PATH)
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


class ValidateBinarySearchTreeTests(unittest.TestCase):
    def test_all_approaches_accept_a_valid_bst(self):
        module = load_solution_module()
        functions = self.get_approaches(module)
        for check in functions:
            with self.subTest(solution=check.__name__):
                root = TreeNode(2, TreeNode(1), TreeNode(3))
                self.assertTrue(check(root))

    def test_all_approaches_reject_a_deep_value_outside_its_ancestor_bounds(self):
        module = load_solution_module()
        functions = self.get_approaches(module)
        # The 3 is locally larger than 2, but it is still in 5's left subtree.
        invalid_root = TreeNode(5, TreeNode(1), TreeNode(7, TreeNode(3), TreeNode(8)))
        for check in functions:
            with self.subTest(solution=check.__name__):
                self.assertFalse(check(invalid_root))

    def test_all_approaches_reject_duplicate_values(self):
        module = load_solution_module()
        functions = self.get_approaches(module)
        duplicate_root = TreeNode(2, TreeNode(2), TreeNode(3))
        for check in functions:
            with self.subTest(solution=check.__name__):
                self.assertFalse(check(duplicate_root))

    def get_approaches(self, module):
        solution_class = getattr(module, "Solution", None)
        self.assertTrue(callable(solution_class), "Expected Solution to be implemented")
        return (
            get_callable(self, module, "is_valid_bst_brute_force"),
            get_callable(self, module, "is_valid_bst_inorder"),
            get_callable(self, solution_class(), "isValidBST"),
        )


if __name__ == "__main__":
    unittest.main()
