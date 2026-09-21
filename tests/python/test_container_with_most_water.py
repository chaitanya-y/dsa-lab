import importlib.util
import unittest
from pathlib import Path


SOLUTION_PATH = (
    Path(__file__).resolve().parents[2]
    / "python/problems/two_pointers/container_with_most_water.py"
)


def load_solution_module():
    spec = importlib.util.spec_from_file_location(
        "container_with_most_water", SOLUTION_PATH
    )
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


HEIGHTS = [1, 8, 6, 2, 5, 4, 8, 3, 7]


class ContainerWithMostWaterTests(unittest.TestCase):
    def test_brute_force_finds_the_largest_container(self):
        module = load_solution_module()
        self.assertEqual(module.max_area_brute_force(HEIGHTS), 49)

    def test_optimized_solution_finds_the_largest_container(self):
        solution = load_solution_module().Solution()
        self.assertEqual(solution.maxArea(HEIGHTS), 49)

    def test_optimized_solution_handles_two_lines(self):
        solution = load_solution_module().Solution()
        self.assertEqual(solution.maxArea([1, 1]), 1)

    def test_optimized_solution_can_find_the_best_container_inside_the_list(self):
        solution = load_solution_module().Solution()
        self.assertEqual(solution.maxArea([1, 2, 1]), 2)


if __name__ == "__main__":
    unittest.main()
