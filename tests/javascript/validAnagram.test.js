const assert = require("node:assert/strict");
const test = require("node:test");
const {
  isAnagram,
  isAnagramBruteForce,
} = require("../../javascript/problems/arrays_hashing/validAnagram");

test("isAnagramBruteForce detects matching character counts", () => {
  assert.equal(typeof isAnagramBruteForce, "function");
  assert.equal(isAnagramBruteForce("anagram", "nagaram"), true);
});

test("isAnagram detects matching character counts", () => {
  assert.equal(typeof isAnagram, "function");
  assert.equal(isAnagram("anagram", "nagaram"), true);
});

test("isAnagram rejects different character counts", () => {
  assert.equal(isAnagram("aacc", "ccac"), false);
});

test("isAnagram rejects strings with different lengths", () => {
  assert.equal(isAnagram("ab", "abc"), false);
});
