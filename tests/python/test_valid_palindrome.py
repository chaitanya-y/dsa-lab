import importlib.util
import unittest
from pathlib import Path


SOLUTION_PATH = (
    Path(__file__).resolve().parents[2]
    / "python/problems/two_pointers/valid_palindrome.py"
)


def load_solution_module():
    spec = importlib.util.spec_from_file_location("valid_palindrome", SOLUTION_PATH)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


PALINDROME = "A man, a plan, a canal: Panama"


class ValidPalindromeTests(unittest.TestCase):
    def test_brute_force_ignores_punctuation_and_uppercase_letters(self):
        module = load_solution_module()
        self.assertTrue(module.is_palindrome_brute_force(PALINDROME))

    def test_optimized_solution_ignores_punctuation_and_uppercase_letters(self):
        solution = load_solution_module().Solution()
        self.assertTrue(solution.isPalindrome(PALINDROME))

    def test_optimized_solution_returns_false_when_cleaned_characters_do_not_match(self):
        solution = load_solution_module().Solution()
        self.assertFalse(solution.isPalindrome("race a car"))

    def test_optimized_solution_returns_true_when_input_has_no_letters_or_numbers(self):
        solution = load_solution_module().Solution()
        self.assertTrue(solution.isPalindrome(".,!"))


if __name__ == "__main__":
    unittest.main()
