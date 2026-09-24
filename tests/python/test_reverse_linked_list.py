import importlib.util
import unittest
from pathlib import Path


SOLUTION_PATH = (
    Path(__file__).resolve().parents[2]
    / "python/problems/linked_list/reverse_linked_list.py"
)


def load_solution_module():
    spec = importlib.util.spec_from_file_location("reverse_linked_list", SOLUTION_PATH)
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


class ReverseLinkedListTests(unittest.TestCase):
    def test_brute_force_reverses_all_nodes(self):
        module = load_solution_module()
        result = module.reverse_list_brute_force(build_list([1, 2, 3, 4]))
        self.assertEqual(list_values(result), [4, 3, 2, 1])

    def test_brute_force_handles_an_empty_list(self):
        module = load_solution_module()
        self.assertIsNone(module.reverse_list_brute_force(None))

    def test_optimized_solution_reverses_all_nodes(self):
        solution = load_solution_module().Solution()
        result = solution.reverseList(build_list([1, 2, 3, 4]))
        self.assertEqual(list_values(result), [4, 3, 2, 1])

    def test_optimized_solution_handles_a_single_node(self):
        solution = load_solution_module().Solution()
        result = solution.reverseList(build_list([7]))
        self.assertEqual(list_values(result), [7])


if __name__ == "__main__":
    unittest.main()
