"""Best Time to Buy and Sell Stock.

Choose one day to buy and a later day to sell for the largest profit.
Return 0 when no profitable sale exists.

n = number of prices.

How to test:
Test file: tests/python/test_best_time_to_buy_and_sell_stock.py
Run: PYTHONDONTWRITEBYTECODE=1 python3 -m unittest -v tests/python/test_best_time_to_buy_and_sell_stock.py
"""


def max_profit_brute_force(prices: list[int]) -> int:
    """Try every buy day with every later sell day.

    Time: O(n^2), because two loops try every valid buy/sell pair.
    Space: O(1), because only number variables are stored.
    """
    # Store the best profit found so far.
    max_profit = 0

    # Choose a day to buy.
    for buy_day in range(len(prices) - 1):
        # Choose a day after buy_day to sell.
        for sell_day in range(buy_day + 1, len(prices)):
            # Subtract the buying price from the selling price.
            profit = prices[sell_day] - prices[buy_day]
            # Keep the best profit; a loss never replaces the starting 0.
            max_profit = max(max_profit, profit)

    # Return the largest possible profit.
    return max_profit


class Solution:
    def maxProfit(self, prices: list[int]) -> int:
        """Remember the cheapest earlier price while checking each sell day.

        Time: O(n), because every price is read once.
        Space: O(1), because only two number variables are stored.
        """
        # Treat the first day as the lowest possible buying price initially.
        lowest_buy_price = prices[0]
        # Start with 0 because we may never find a profitable sale.
        max_profit_so_far = 0

        # Check every later day as a possible selling day.
        for sell_day in range(1, len(prices)):
            # Read today's selling price once for clarity.
            sell_price = prices[sell_day]

            # A cheaper price makes a better future buying day.
            if sell_price < lowest_buy_price:
                lowest_buy_price = sell_price
            else:
                # Calculate profit from the best earlier buy to today's sale.
                profit = sell_price - lowest_buy_price
                # Keep the best profit found so far.
                max_profit_so_far = max(max_profit_so_far, profit)

        # Return the largest profit found.
        return max_profit_so_far
