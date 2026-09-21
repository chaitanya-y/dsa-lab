import importlib.util
import unittest
from pathlib import Path


SOLUTION_PATH = (
    Path(__file__).resolve().parents[2]
    / "python/problems/sliding_window/longest_substring_without_repeating_characters.py"
)


def load_solution_module():
    spec = importlib.util.spec_from_file_location(
        "longest_substring_without_repeating_characters", SOLUTION_PATH
    )
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


class LongestSubstringWithoutRepeatingCharactersTests(unittest.TestCase):
    def test_brute_force_finds_the_longest_unique_substring(self):
        module = load_solution_module()
        self.assertEqual(module.length_of_longest_substring_brute_force("abcabcbb"), 3)

    def test_optimized_solution_finds_the_longest_unique_substring(self):
        solution = load_solution_module().Solution()
        self.assertEqual(solution.lengthOfLongestSubstring("abcabcbb"), 3)

    def test_optimized_solution_handles_one_repeated_character(self):
        solution = load_solution_module().Solution()
        self.assertEqual(solution.lengthOfLongestSubstring("bbbbb"), 1)

    def test_optimized_solution_moves_past_a_duplicate_inside_the_window(self):
        solution = load_solution_module().Solution()
        self.assertEqual(solution.lengthOfLongestSubstring("pwwkew"), 3)


if __name__ == "__main__":
    unittest.main()
