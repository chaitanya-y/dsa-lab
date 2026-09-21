import importlib.util
import unittest
from pathlib import Path


SOLUTION_PATH = (
    Path(__file__).resolve().parents[2]
    / "python/problems/arrays_hashing/group_anagrams.py"
)


def load_solution_module():
    spec = importlib.util.spec_from_file_location("group_anagrams", SOLUTION_PATH)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def normalize(groups):
    return sorted(sorted(group) for group in groups)


WORDS = ["eat", "tea", "tan", "ate", "nat", "bat"]
EXPECTED = [["eat", "tea", "ate"], ["tan", "nat"], ["bat"]]


class GroupAnagramsTests(unittest.TestCase):
    def test_brute_force_groups_anagrams(self):
        module = load_solution_module()
        self.assertTrue(hasattr(module, "group_anagrams_brute_force"))
        self.assertEqual(normalize(module.group_anagrams_brute_force(WORDS)), normalize(EXPECTED))

    def test_sorted_key_solution_groups_anagrams(self):
        module = load_solution_module()
        self.assertTrue(hasattr(module, "group_anagrams_sorted"))
        self.assertEqual(normalize(module.group_anagrams_sorted(WORDS)), normalize(EXPECTED))

    def test_optimized_solution_groups_anagrams(self):
        solution = load_solution_module().Solution()
        self.assertEqual(normalize(solution.groupAnagrams(WORDS)), normalize(EXPECTED))

    def test_optimized_solution_handles_an_empty_list(self):
        solution = load_solution_module().Solution()
        self.assertEqual(solution.groupAnagrams([]), [])

    def test_optimized_solution_keeps_a_single_empty_string(self):
        solution = load_solution_module().Solution()
        self.assertEqual(solution.groupAnagrams([""]), [[""]])


if __name__ == "__main__":
    unittest.main()
