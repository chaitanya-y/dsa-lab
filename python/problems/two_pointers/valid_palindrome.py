"""Valid Palindrome.

Return True when a string reads the same forward and backward after ignoring
punctuation, spaces, and uppercase/lowercase differences.

Example: "A man, a plan, a canal: Panama" is True.

n = number of characters in s.

How to test:
Test file: tests/python/test_valid_palindrome.py
Run: PYTHONDONTWRITEBYTECODE=1 python3 -m unittest -v tests/python/test_valid_palindrome.py
"""


def is_alphanumeric(char: str) -> bool:
    """Return True only for English letters A-Z/a-z or digits 0-9."""
    return (
        ord("A") <= ord(char) <= ord("Z")
        or ord("a") <= ord(char) <= ord("z")
        or ord("0") <= ord(char) <= ord("9")
    )


def is_palindrome_brute_force(s: str) -> bool:
    """Clean the string, reverse it, then compare the two strings.

    Time: O(n), because we read the string a few times.
    Space: O(n), because cleaned and reversed strings are created.
    """
    cleaned_chars = []

    for char in s:
        # Python's built-in isalnum() is true for letters and digits.
        if char.isalnum():
            cleaned_chars.append(char.lower())

    cleaned = "".join(cleaned_chars)
    return cleaned == cleaned[::-1]


class Solution:
    def isPalindrome(self, s: str) -> bool:
        """Compare characters from both ends without making a cleaned string.

        left and right skip punctuation/spaces, then compare lowercase letters.

        Time: O(n): each pointer only moves inward.
        Space: O(1): only two indexes are stored.
        """
        left, right = 0, len(s) - 1

        while left < right:
            # Move left past spaces and punctuation.
            while left < right and not is_alphanumeric(s[left]):
                left += 1

            # Move right past spaces and punctuation.
            while left < right and not is_alphanumeric(s[right]):
                right -= 1

            # Compare without caring about uppercase/lowercase differences.
            if s[left].lower() != s[right].lower():
                return False

            left += 1
            right -= 1

        return True
