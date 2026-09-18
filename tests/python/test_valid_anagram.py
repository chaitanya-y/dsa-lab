import importlib.util
import unittest
from pathlib import Path


SOLUTION_PATH = (
    Path(__file__).resolve().parents[2]
    / "python/problems/arrays_hashing/valid_anagram.py"
)


def load_solution_module():
    spec = importlib.util.spec_from_file_location("valid_anagram", SOLUTION_PATH)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


class ValidAnagramTests(unittest.TestCase):
    def test_brute_force_detects_matching_character_counts(self):
        module = load_solution_module()
        self.assertTrue(hasattr(module, "is_anagram_brute_force"))
        self.assertTrue(module.is_anagram_brute_force("anagram", "nagaram"))

    def test_optimized_solution_detects_matching_character_counts(self):
        solution = load_solution_module().Solution()
        self.assertTrue(solution.isAnagram("anagram", "nagaram"))

    def test_optimized_solution_rejects_different_character_counts(self):
        solution = load_solution_module().Solution()
        self.assertFalse(solution.isAnagram("aacc", "ccac"))

    def test_optimized_solution_rejects_different_lengths(self):
        solution = load_solution_module().Solution()
        self.assertFalse(solution.isAnagram("ab", "abc"))


if __name__ == "__main__":
    unittest.main()
