import importlib.util
import unittest
from pathlib import Path


SOLUTION_PATH = (
    Path(__file__).resolve().parents[2]
    / "python/problems/arrays_hashing/product_of_array_except_self.py"
)


def load_solution_module():
    spec = importlib.util.spec_from_file_location(
        "product_of_array_except_self", SOLUTION_PATH
    )
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


NUMBERS = [1, 2, 3, 4]
EXPECTED = [24, 12, 8, 6]


class ProductOfArrayExceptSelfTests(unittest.TestCase):
    def test_brute_force_multiplies_every_number_except_the_current_one(self):
        module = load_solution_module()
        self.assertTrue(hasattr(module, "product_except_self_brute_force"))
        self.assertEqual(module.product_except_self_brute_force(NUMBERS), EXPECTED)

    def test_left_and_right_arrays_combine_the_two_sides(self):
        module = load_solution_module()
        self.assertTrue(hasattr(module, "product_except_self_with_arrays"))
        self.assertEqual(module.product_except_self_with_arrays(NUMBERS), EXPECTED)

    def test_optimized_solution_returns_the_product_of_every_other_number(self):
        solution = load_solution_module().Solution()
        self.assertEqual(solution.productExceptSelf(NUMBERS), EXPECTED)

    def test_optimized_solution_handles_a_zero_without_division(self):
        solution = load_solution_module().Solution()
        self.assertEqual(solution.productExceptSelf([-1, 1, 0, -3, 3]), [0, 0, 9, 0, 0])

    def test_optimized_solution_returns_one_for_one_number(self):
        solution = load_solution_module().Solution()
        self.assertEqual(solution.productExceptSelf([5]), [1])


if __name__ == "__main__":
    unittest.main()
