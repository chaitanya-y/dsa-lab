"""Group Anagrams.

Question:
Given a list of strings, group words that are anagrams of each other.
Anagrams contain the same characters with the same counts.

In the complexity comments below:
n = number of words, m = length of the longest word.

How to test:
Test file: tests/python/test_group_anagrams.py
Run: PYTHONDONTWRITEBYTECODE=1 python3 -m unittest -v tests/python/test_group_anagrams.py
"""

from collections import defaultdict


def group_anagrams_brute_force(strs: list[str]) -> list[list[str]]:
    """Compare each word against every existing group.

    n = number of words, m = length of the longest word.
    Time: O(n^2 * m log m), because sorting happens for many comparisons.
    Space: O(n * m), for the returned groups.
    """
    groups = []

    for word in strs:
        sorted_word = sorted(word)
        placed = False

        for group in groups:
            if sorted_word == sorted(group[0]):
                group.append(word)
                placed = True
                break

        if not placed:
            groups.append([word])

    return groups


def group_anagrams_sorted(strs: list[str]) -> list[list[str]]:
    """Use sorted characters as the key.

    n = number of words, m = length of the longest word.
    Time: O(n * m log m), because every word is sorted once.
    Space: O(n * m), for the dictionary and returned groups.
    """
    res = defaultdict(list)

    for s in strs:
        sorted_s = "".join(sorted(s))
        res[sorted_s].append(s)

    return list(res.values())


class Solution:
    def groupAnagrams(self, strs: list[str]) -> list[list[str]]:
        """Use a 26-letter frequency tuple as a dictionary key.

        n = number of words, m = length of the longest word.
        Time: O(n * m), because every character is read once.
        Space: O(n * m), for the groups we return.
        """
        groups = defaultdict(list)

        for word in strs:
            count = [0] * 26

            for char in word:
                count[ord(char) - ord("a")] += 1

            # A tuple can be a dictionary key; a list cannot.
            groups[tuple(count)].append(word)

        return list(groups.values())
