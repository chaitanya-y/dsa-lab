"""Valid Anagram.

Question:
Given two strings ``s`` and ``t``, return ``True`` when ``t`` is an anagram
of ``s``. An anagram uses the same characters with the same counts.

This file includes a brute-force sorting solution and an optimized
frequency-counting solution.

How to test:
Test file: tests/python/test_valid_anagram.py
Run: PYTHONDONTWRITEBYTECODE=1 python3 -m unittest -v tests/python/test_valid_anagram.py
"""


def is_anagram_brute_force(s: str, t: str) -> bool:
    """Sort both strings and compare them.

    Time: O(n log n), because sorting n characters takes n log n time.
    Space: O(n), because sorted creates character lists.
    """
    if len(s) != len(t):
        return False

    return sorted(s) == sorted(t)


class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        """Count characters in one pass over each string.

        Time: O(n), because n + n is still O(n).
        Space: O(k), where k is the number of different characters stored.
        """
        if len(s) != len(t):
            return False

        count = {}

        for char in s:
            count[char] = count.get(char, 0) + 1

        for char in t:
            if count.get(char, 0) == 0:
                return False

            count[char] -= 1

        return True
