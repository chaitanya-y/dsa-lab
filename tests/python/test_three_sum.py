import importlib.util
import unittest
from pathlib import Path


SOLUTION_PATH = (
    Path(__file__).resolve().parents[2]
    / "python/problems/two_pointers/three_sum.py"
)


def load_solution_module():
    spec = importlib.util.spec_from_file_location("three_sum", SOLUTION_PATH)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def normalize(triplets):
    return sorted(sorted(triplet) for triplet in triplets)


NUMBERS = [-1, 0, 1, 2, -1, -4]
EXPECTED = [[-1, -1, 2], [-1, 0, 1]]


class ThreeSumTests(unittest.TestCase):
    def test_brute_force_returns_each_unique_zero_sum_triplet(self):
        module = load_solution_module()
        self.assertEqual(
            normalize(module.three_sum_brute_force(NUMBERS)), normalize(EXPECTED)
        )

    def test_optimized_solution_returns_each_unique_zero_sum_triplet(self):
        solution = load_solution_module().Solution()
        self.assertEqual(normalize(solution.threeSum(NUMBERS)), normalize(EXPECTED))

    def test_optimized_solution_returns_no_triplets_when_every_number_is_positive(self):
        solution = load_solution_module().Solution()
        self.assertEqual(solution.threeSum([1, 2, 3]), [])

    def test_optimized_solution_returns_one_triplet_for_three_zeroes(self):
        solution = load_solution_module().Solution()
        self.assertEqual(solution.threeSum([0, 0, 0, 0]), [[0, 0, 0]])


if __name__ == "__main__":
    unittest.main()
