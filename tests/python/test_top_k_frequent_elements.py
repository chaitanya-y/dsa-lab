import importlib.util
import unittest
from pathlib import Path


SOLUTION_PATH = (
    Path(__file__).resolve().parents[2]
    / "python/problems/arrays_hashing/top_k_frequent_elements.py"
)


def load_solution_module():
    spec = importlib.util.spec_from_file_location("top_k_frequent_elements", SOLUTION_PATH)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


class TopKFrequentElementsTests(unittest.TestCase):
    def test_sorted_solution_returns_the_two_most_frequent_numbers(self):
        module = load_solution_module()
        self.assertEqual(
            module.top_k_frequent_sorted([1, 1, 1, 2, 2, 3], 2), [1, 2]
        )

    def test_bucket_solution_returns_the_two_most_frequent_numbers(self):
        solution = load_solution_module().Solution()
        self.assertEqual(solution.topKFrequent([1, 1, 1, 2, 2, 3], 2), [1, 2])

    def test_bucket_solution_handles_negative_numbers(self):
        solution = load_solution_module().Solution()
        self.assertEqual(solution.topKFrequent([-1, -1, -2, -2, -2, 5], 1), [-2])

    def test_bucket_solution_returns_every_unique_number_when_k_matches_their_count(self):
        solution = load_solution_module().Solution()
        self.assertEqual(sorted(solution.topKFrequent([4, 4, 6, 6], 2)), [4, 6])


if __name__ == "__main__":
    unittest.main()
