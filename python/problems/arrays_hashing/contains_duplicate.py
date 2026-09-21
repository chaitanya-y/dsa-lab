"""Contains Duplicate.

Question:
Given an integer list ``nums``, return ``True`` when any value appears at
least twice. Otherwise, return ``False``.

This file first shows a brute-force comparison, then the optimized hash-set
solution that is appropriate for an interview submission.

Python's ``set`` is similar to JavaScript's ``Set``: it stores unique values
and makes membership checks such as ``num in seen`` fast.

How to test:
Test file: tests/python/test_contains_duplicate.py
Run: PYTHONDONTWRITEBYTECODE=1 python3 -m unittest -v tests/python/test_contains_duplicate.py
"""


def has_duplicate_brute_force(nums: list[int]) -> bool:
    """Compare every pair of values: O(n^2) time and O(1) extra space."""
    for left in range(len(nums)):
        for right in range(left + 1, len(nums)):
            if nums[left] == nums[right]:
                return True

    return False


class Solution:
    def hasDuplicate(self, nums: list[int]) -> bool:
        """Scan once: O(n) time and O(n) worst-case extra space."""
        # set() stores values that we have already seen.
        seen = set()

        for num in nums:
            # `in` checks whether num is already in the set.
            if num in seen:
                return True

            # add() remembers num for future checks.
            seen.add(num)

        return False
