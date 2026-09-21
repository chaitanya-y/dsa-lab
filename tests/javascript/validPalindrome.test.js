const assert = require("node:assert/strict");
const test = require("node:test");
const {
  isPalindrome,
  isPalindromeBruteForce,
} = require("../../javascript/problems/two_pointers/validPalindrome");

const PALINDROME = "A man, a plan, a canal: Panama";

test("isPalindromeBruteForce ignores punctuation and uppercase letters", () => {
  assert.equal(isPalindromeBruteForce(PALINDROME), true);
});

test("isPalindrome ignores punctuation and uppercase letters", () => {
  assert.equal(isPalindrome(PALINDROME), true);
});

test("isPalindrome returns false when cleaned characters do not match", () => {
  assert.equal(isPalindrome("race a car"), false);
});

test("isPalindrome returns true when the input has no letters or numbers", () => {
  assert.equal(isPalindrome(".,!"), true);
});
