import importlib.util
import unittest
from pathlib import Path


SOLUTION_PATH = (
    Path(__file__).resolve().parents[2]
    / "python/problems/linked_list/merge_k_sorted_lists.py"
)


def load_solution_module():
    spec = importlib.util.spec_from_file_location("merge_k_sorted_lists", SOLUTION_PATH)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def get_callable(test_case, owner, name):
    function = getattr(owner, name, None)
    test_case.assertTrue(callable(function), f"Expected {name} to be implemented")
    return function


class ListNode:
    def __init__(self, val=0, next_node=None):
        self.val = val
        self.next = next_node


def build_list(values):
    head = None
    for value in reversed(values):
        head = ListNode(value, head)
    return head


def build_lists(values_by_list):
    return [build_list(values) for values in values_by_list]


def list_values(head):
    values = []
    while head is not None:
        values.append(head.val)
        head = head.next
    return values


class MergeKSortedListsTests(unittest.TestCase):
    def test_brute_force_flattens_and_sorts_all_nodes(self):
        module = load_solution_module()
        merge = get_callable(self, module, "merge_k_lists_brute_force")
        result = merge(build_lists([[1, 4, 5], [1, 3, 4], [2, 6]]))
        self.assertEqual(list_values(result), [1, 1, 2, 3, 4, 4, 5, 6])

    def test_sequential_solution_merges_one_list_at_a_time(self):
        module = load_solution_module()
        merge = get_callable(self, module, "merge_k_lists_sequential")
        result = merge(build_lists([[1, 4, 5], [1, 3, 4], [2, 6]]))
        self.assertEqual(list_values(result), [1, 1, 2, 3, 4, 4, 5, 6])

    def test_pairwise_solution_handles_an_odd_number_of_lists(self):
        module = load_solution_module()
        merge = get_callable(self, module, "merge_k_lists_pairwise")
        result = merge(build_lists([[1, 4], [2, 3], [5, 7]]))
        self.assertEqual(list_values(result), [1, 2, 3, 4, 5, 7])

    def test_heap_solution_merges_lists_with_duplicate_values(self):
        module = load_solution_module()
        solution_class = getattr(module, "Solution", None)
        self.assertTrue(callable(solution_class), "Expected Solution to be implemented")
        merge = get_callable(self, solution_class(), "mergeKLists")
        result = merge(build_lists([[1, 1], [1, 2], [1, 3]]))
        self.assertEqual(list_values(result), [1, 1, 1, 1, 2, 3])

    def test_each_approach_handles_no_lists(self):
        module = load_solution_module()
        for name in (
            "merge_k_lists_brute_force",
            "merge_k_lists_sequential",
            "merge_k_lists_pairwise",
        ):
            with self.subTest(solution=name):
                merge = get_callable(self, module, name)
                self.assertIsNone(merge([]))

        solution_class = getattr(module, "Solution", None)
        self.assertTrue(callable(solution_class), "Expected Solution to be implemented")
        merge = get_callable(self, solution_class(), "mergeKLists")
        self.assertIsNone(merge([]))


if __name__ == "__main__":
    unittest.main()
