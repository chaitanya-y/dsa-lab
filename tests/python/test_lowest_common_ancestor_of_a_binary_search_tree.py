import importlib.util
import unittest
from pathlib import Path


SOLUTION_PATH = (
    Path(__file__).resolve().parents[2]
    / "python/problems/trees/lowest_common_ancestor_of_a_binary_search_tree.py"
)


def load_solution_module():
    spec = importlib.util.spec_from_file_location(
        "lowest_common_ancestor_of_a_binary_search_tree", SOLUTION_PATH
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


def build_bst():
    nodes = {value: TreeNode(value) for value in (6, 2, 8, 0, 4, 7, 9, 3, 5)}
    nodes[6].left = nodes[2]
    nodes[6].right = nodes[8]
    nodes[2].left = nodes[0]
    nodes[2].right = nodes[4]
    nodes[8].left = nodes[7]
    nodes[8].right = nodes[9]
    nodes[4].left = nodes[3]
    nodes[4].right = nodes[5]
    return nodes[6], nodes


class LowestCommonAncestorOfBSTTests(unittest.TestCase):
    def test_all_approaches_find_common_ancestors_on_different_branches(self):
        module = load_solution_module()
        functions = (
            get_callable(self, module, "lowest_common_ancestor_brute_force"),
            get_callable(self, module, "lowest_common_ancestor_recursive"),
            get_callable(self, getattr(module, "Solution")(), "lowestCommonAncestor"),
        )

        for find_ancestor in functions:
            with self.subTest(solution=find_ancestor.__name__):
                root, nodes = build_bst()
                self.assertIs(find_ancestor(root, nodes[2], nodes[8]), nodes[6])
                self.assertIs(find_ancestor(root, nodes[3], nodes[5]), nodes[4])


if __name__ == "__main__":
    unittest.main()
