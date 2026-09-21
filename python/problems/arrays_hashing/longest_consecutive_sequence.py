"""Longest Consecutive Sequence.

Return the length of the longest sequence of numbers that increase by 1.
The sequence values do not need to be next to each other in nums.

Example: [100, 4, 200, 1, 3, 2] contains 1, 2, 3, 4.
answer = 4

n = number of values in nums.

How to test:
Test file: tests/python/test_longest_consecutive_sequence.py
Run: PYTHONDONTWRITEBYTECODE=1 python3 -m unittest -v tests/python/test_longest_consecutive_sequence.py
"""


def longest_consecutive_brute_force(nums: list[int]) -> int:
    """Start at every number and repeatedly search the original list.

    `next_number in nums` may scan all n values. We do this while counting
    from many possible starting values, so it repeats a lot of work.

    Time: O(n^3) in the worst case.
    Space: O(1), not counting the input.
    """
    longest = 0

    for num in nums:
        length = 1
        next_number = num + 1

        while next_number in nums:
            length += 1
            next_number += 1

        longest = max(longest, length)

    return longest


class Solution:
    def longestConsecutive(self, nums: list[int]) -> int:
        """Use a set and count only from the start of each sequence.

        A number starts a sequence when `number - 1` is absent. For 1, 2, 3,
        4, only 1 is the start. This prevents recounting the same sequence.

        Time: O(n) on average: set lookups are about O(1), and each unique
        number is visited only a small number of times.
        Space: O(n), for the set of unique numbers.
        """
        num_set = set(nums)
        longest = 0

        # Loop through the set to ignore duplicate numbers.
        for num in num_set:
            # Skip 2, 3, and 4 when 1, 2, and 3 exist before them.
            if num - 1 in num_set:
                continue

            # num is the first number in a sequence; count forward from it.
            length = 1
            next_number = num + 1

            while next_number in num_set:
                length += 1
                next_number += 1

            longest = max(longest, length)

        return longest
