import importlib.util
import unittest
from pathlib import Path


SOLUTION_PATH = (
    Path(__file__).resolve().parents[2]
    / "python/problems/sliding_window/best_time_to_buy_and_sell_stock.py"
)


def load_solution_module():
    spec = importlib.util.spec_from_file_location(
        "best_time_to_buy_and_sell_stock", SOLUTION_PATH
    )
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


class BestTimeToBuyAndSellStockTests(unittest.TestCase):
    def test_brute_force_finds_the_best_buy_and_later_sell_day(self):
        module = load_solution_module()
        self.assertEqual(module.max_profit_brute_force([7, 1, 5, 3, 6, 4]), 5)

    def test_optimized_solution_finds_the_best_buy_and_later_sell_day(self):
        solution = load_solution_module().Solution()
        self.assertEqual(solution.maxProfit([7, 1, 5, 3, 6, 4]), 5)

    def test_optimized_solution_returns_zero_when_prices_always_fall(self):
        solution = load_solution_module().Solution()
        self.assertEqual(solution.maxProfit([7, 6, 4, 3, 1]), 0)

    def test_optimized_solution_can_sell_after_a_new_lowest_price(self):
        solution = load_solution_module().Solution()
        self.assertEqual(solution.maxProfit([2, 4, 1, 7]), 6)


if __name__ == "__main__":
    unittest.main()
