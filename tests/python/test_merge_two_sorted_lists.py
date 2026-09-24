import importlib.util
import unittest
from pathlib import Path


SOLUTION_PATH = (
    Path(__file__).resolve().parents[2]
    / "python/problems/linked_list/merge_two_sorted_lists.py"
)


def load_solution_module():
    spec = importlib.util.spec_from_file_location("merge_two_sorted_lists", SOLUTION_PATH)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


class ListNode:
    def __init__(self, val=0, next_node=None):
        self.val = val
        self.next = next_node


def build_list(values):
    head = None
    for value in reversed(values):
        head = ListNode(value, head)
    return head


def list_values(head):
    values = []
    while head is not None:
        values.append(head.val)
        head = head.next
    return values


class MergeTwoSortedListsTests(unittest.TestCase):
    def test_brute_force_merges_values_in_sorted_order(self):
        module = load_solution_module()
        result = module.merge_two_lists_brute_force(
            build_list([1, 2, 4]), build_list([1, 3, 5])
        )
        self.assertEqual(list_values(result), [1, 1, 2, 3, 4, 5])

    def test_brute_force_handles_two_empty_lists(self):
        module = load_solution_module()
        self.assertIsNone(module.merge_two_lists_brute_force(None, None))

    def test_optimized_solution_merges_values_in_sorted_order(self):
        solution = load_solution_module().Solution()
        result = solution.mergeTwoLists(
            build_list([1, 2, 4]), build_list([1, 3, 5])
        )
        self.assertEqual(list_values(result), [1, 1, 2, 3, 4, 5])

    def test_optimized_solution_returns_the_nonempty_list_when_other_is_empty(self):
        solution = load_solution_module().Solution()
        result = solution.mergeTwoLists(None, build_list([2, 3]))
        self.assertEqual(list_values(result), [2, 3])


if __name__ == "__main__":
    unittest.main()
