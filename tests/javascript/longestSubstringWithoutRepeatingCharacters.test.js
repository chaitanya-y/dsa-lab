const assert = require("node:assert/strict");
const test = require("node:test");
const {
  lengthOfLongestSubstring,
  lengthOfLongestSubstringBruteForce,
} = require("../../javascript/problems/sliding_window/longestSubstringWithoutRepeatingCharacters");

test("lengthOfLongestSubstringBruteForce finds the longest unique substring", () => {
  assert.equal(lengthOfLongestSubstringBruteForce("abcabcbb"), 3);
});

test("lengthOfLongestSubstring finds the longest unique substring", () => {
  assert.equal(lengthOfLongestSubstring("abcabcbb"), 3);
});

test("lengthOfLongestSubstring handles one repeated character", () => {
  assert.equal(lengthOfLongestSubstring("bbbbb"), 1);
});

test("lengthOfLongestSubstring moves past a duplicate inside the window", () => {
  assert.equal(lengthOfLongestSubstring("pwwkew"), 3);
});
