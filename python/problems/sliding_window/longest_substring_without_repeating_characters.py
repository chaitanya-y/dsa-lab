"""Longest Substring Without Repeating Characters.

Return the length of the longest consecutive part of s with no repeated
characters.

n = number of characters in s.

How to test:
Test file: tests/python/test_longest_substring_without_repeating_characters.py
Run: PYTHONDONTWRITEBYTECODE=1 python3 -m unittest -v tests/python/test_longest_substring_without_repeating_characters.py
"""


def length_of_longest_substring_brute_force(s: str) -> int:
    """Begin every possible substring and stop when it repeats a character.

    Time: O(n^2), because each starting character may scan many later characters.
    Space: O(n), for the set that tracks one substring.
    """
    # Store the longest unique substring length found so far.
    longest_length = 0

    # Try every character as the beginning of a substring.
    for start in range(len(s)):
        # Track characters in the substring that begins at start.
        characters = set()

        # Extend this substring one character at a time.
        for end in range(start, len(s)):
            # Read the character that is trying to join this substring.
            char = s[end]

            # A duplicate means this substring cannot grow further.
            if char in characters:
                break

            # Add the new unique character to this substring.
            characters.add(char)
            # end - start + 1 is this substring's length.
            longest_length = max(longest_length, end - start + 1)

    # Return the largest unique substring length.
    return longest_length


class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        """Use a sliding window and shrink it only when a duplicate appears.

        Time: O(n), because each character enters once and leaves at most once.
        Space: O(n), for the set holding current window characters.
        """
        # left is the first index of the current unique window.
        left = 0
        # Store the longest valid window length found so far.
        longest_length = 0
        # Store characters currently inside the window.
        characters = set()

        # right expands the window by reading every character once.
        for right in range(len(s)):
            # Read the character that is trying to enter the window.
            char = s[right]

            # Shrink from the left until char is no longer duplicated.
            while char in characters:
                # Remove the character that is leaving the window.
                characters.remove(s[left])
                # Move the start of the window rightward.
                left += 1

            # Add char after the window no longer contains a duplicate.
            characters.add(char)
            # right - left + 1 is the current valid window length.
            longest_length = max(longest_length, right - left + 1)

        # Return the largest unique window length.
        return longest_length
