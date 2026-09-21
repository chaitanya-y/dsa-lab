"""Two Sum.

Question:
Given an integer list ``nums`` and a target, return the indices of two
numbers whose sum equals the target. Do not use the same element twice.
Return an empty list when no pair exists.

How to test:
Test file: tests/python/test_two_sum.py
Run: PYTHONDONTWRITEBYTECODE=1 python3 -m unittest -v tests/python/test_two_sum.py
"""


def two_sum_brute_force(nums: list[int], target: int) -> list[int]:
    """Try every pair: O(n^2) time and O(1) extra space."""
    for left in range(len(nums)):
        for right in range(left + 1, len(nums)):
            if nums[left] + nums[right] == target:
                return [left, right]

    return []


class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        """Use a dictionary: O(n) time and O(n) extra space."""
        seen = {}  # number -> index

        for i, current in enumerate(nums):
            complement = target - current

            # Did we see the matching number earlier?
            if complement in seen:
                return [seen[complement], i]

            # Remember this number for a later pair.
            seen[current] = i

        return []
