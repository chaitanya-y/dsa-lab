import importlib.util
import unittest
from pathlib import Path


SOLUTION_PATH = (
    Path(__file__).resolve().parents[2]
    / "python/problems/trees/kth_smallest_element_in_a_bst.py"
)


def load_solution_module():
    spec = importlib.util.spec_from_file_location(
        "kth_smallest_element_in_a_bst", SOLUTION_PATH
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
    return TreeNode(5, TreeNode(3, TreeNode(2, TreeNode(1)), TreeNode(4)), TreeNode(6))


class KthSmallestElementInBSTTests(unittest.TestCase):
    def test_all_approaches_find_the_third_smallest_value(self):
        module = load_solution_module()
        for find_kth in self.get_approaches(module):
            with self.subTest(solution=find_kth.__name__):
                self.assertEqual(find_kth(build_tree(), 3), 3)

    def test_all_approaches_handle_the_smallest_and_largest_values(self):
        module = load_solution_module()
        for find_kth in self.get_approaches(module):
            with self.subTest(solution=find_kth.__name__):
                self.assertEqual(find_kth(build_tree(), 1), 1)
                self.assertEqual(find_kth(build_tree(), 6), 6)

    def test_standard_solution_method_uses_the_optimized_traversal(self):
        module = load_solution_module()
        solution_class = getattr(module, "Solution", None)
        self.assertTrue(callable(solution_class), "Expected Solution to be implemented")
        find_kth = get_callable(self, solution_class(), "kthSmallest")
        self.assertEqual(find_kth(build_tree(), 4), 4)

    def get_approaches(self, module):
        return (
            get_callable(self, module, "kth_smallest_brute_force"),
            get_callable(self, module, "kth_smallest_inorder"),
            get_callable(self, module, "kth_smallest_optimized"),
        )


if __name__ == "__main__":
    unittest.main()
