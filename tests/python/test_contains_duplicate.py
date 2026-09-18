import importlib.util
import unittest
from pathlib import Path


SOLUTION_PATH = (
    Path(__file__).resolve().parents[2]
    / "python/problems/arrays_hashing/contains_duplicate.py"
)


def load_solution_module():
    spec = importlib.util.spec_from_file_location("contains_duplicate", SOLUTION_PATH)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


class ContainsDuplicateTests(unittest.TestCase):
    def test_brute_force_returns_true_when_a_number_appears_twice(self):
        module = load_solution_module()
        self.assertTrue(hasattr(module, "has_duplicate_brute_force"))
        self.assertTrue(module.has_duplicate_brute_force([1, 2, 3, 1]))

    def test_has_duplicate_returns_true_when_a_number_appears_twice(self):
        solution = load_solution_module().Solution()
        self.assertTrue(solution.hasDuplicate([1, 2, 3, 1]))

    def test_has_duplicate_returns_false_when_every_number_is_unique(self):
        solution = load_solution_module().Solution()
        self.assertFalse(solution.hasDuplicate([1, 2, 3, 4]))

    def test_has_duplicate_returns_false_for_an_empty_list(self):
        solution = load_solution_module().Solution()
        self.assertFalse(solution.hasDuplicate([]))


if __name__ == "__main__":
    unittest.main()
