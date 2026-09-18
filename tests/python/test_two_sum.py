import importlib.util
import unittest
from pathlib import Path


SOLUTION_PATH = (
    Path(__file__).resolve().parents[2]
    / "python/problems/arrays_hashing/two_sum.py"
)


def load_solution_module():
    spec = importlib.util.spec_from_file_location("two_sum", SOLUTION_PATH)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


class TwoSumTests(unittest.TestCase):
    def test_brute_force_returns_indices_of_a_matching_pair(self):
        module = load_solution_module()
        self.assertTrue(hasattr(module, "two_sum_brute_force"))
        self.assertEqual(module.two_sum_brute_force([2, 7, 11, 15], 9), [0, 1])

    def test_optimized_solution_returns_indices_of_a_matching_pair(self):
        solution = load_solution_module().Solution()
        self.assertEqual(solution.twoSum([2, 7, 11, 15], 9), [0, 1])

    def test_optimized_solution_handles_duplicate_values(self):
        solution = load_solution_module().Solution()
        self.assertEqual(solution.twoSum([3, 3], 6), [0, 1])

    def test_optimized_solution_returns_empty_list_when_no_pair_exists(self):
        solution = load_solution_module().Solution()
        self.assertEqual(solution.twoSum([1, 2, 3], 10), [])


if __name__ == "__main__":
    unittest.main()
