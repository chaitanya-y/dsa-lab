const assert = require("node:assert/strict");
const test = require("node:test");
const {
  groupAnagrams,
  groupAnagramsBruteForce,
  groupAnagramsSorted,
} = require("../../javascript/problems/arrays_hashing/groupAnagrams");

function normalize(groups) {
  return groups
    .map((group) => [...group].sort())
    .sort((left, right) => left.join(",").localeCompare(right.join(",")));
}

const WORDS = ["eat", "tea", "tan", "ate", "nat", "bat"];
const EXPECTED = [["eat", "tea", "ate"], ["tan", "nat"], ["bat"]];

test("groupAnagramsBruteForce groups anagrams", () => {
  assert.equal(typeof groupAnagramsBruteForce, "function");
  assert.deepEqual(normalize(groupAnagramsBruteForce(WORDS)), normalize(EXPECTED));
});

test("groupAnagramsSorted groups anagrams with sorted keys", () => {
  assert.equal(typeof groupAnagramsSorted, "function");
  assert.deepEqual(normalize(groupAnagramsSorted(WORDS)), normalize(EXPECTED));
});

test("groupAnagrams groups anagrams", () => {
  assert.equal(typeof groupAnagrams, "function");
  assert.deepEqual(normalize(groupAnagrams(WORDS)), normalize(EXPECTED));
});

test("groupAnagrams handles an empty list", () => {
  assert.deepEqual(groupAnagrams([]), []);
});

test("groupAnagrams keeps a single empty string", () => {
  assert.deepEqual(groupAnagrams([""]), [[""]]);
});
