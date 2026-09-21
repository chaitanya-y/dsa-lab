import importlib.util
import unittest
from pathlib import Path


SOLUTION_PATH = (
    Path(__file__).resolve().parents[2]
    / "python/problems/arrays_hashing/longest_consecutive_sequence.py"
)


def load_solution_module():
    spec = importlib.util.spec_from_file_location(
        "longest_consecutive_sequence", SOLUTION_PATH
    )
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


NUMBERS = [100, 4, 200, 1, 3, 2]


class LongestConsecutiveSequenceTests(unittest.TestCase):
    def test_brute_force_finds_a_sequence_split_across_the_list(self):
        module = load_solution_module()
        self.assertEqual(module.longest_consecutive_brute_force(NUMBERS), 4)

    def test_optimized_solution_finds_a_sequence_split_across_the_list(self):
        solution = load_solution_module().Solution()
        self.assertEqual(solution.longestConsecutive(NUMBERS), 4)

    def test_optimized_solution_ignores_duplicate_values(self):
        solution = load_solution_module().Solution()
        self.assertEqual(solution.longestConsecutive([1, 2, 2, 3]), 3)

    def test_optimized_solution_returns_zero_for_an_empty_list(self):
        solution = load_solution_module().Solution()
        self.assertEqual(solution.longestConsecutive([]), 0)


if __name__ == "__main__":
    unittest.main()
