const assert = require("node:assert/strict");
const test = require("node:test");

let solutions = {};
try {
  solutions = require("../../javascript/problems/trees/kthSmallestElementInBST");
} catch {
  // Keep a missing module or export as a readable assertion failure in the tests.
}

class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildTree() {
  return new TreeNode(
    5,
    new TreeNode(3, new TreeNode(2, new TreeNode(1)), new TreeNode(4)),
    new TreeNode(6),
  );
}

function requireSolution(name) {
  assert.equal(typeof solutions[name], "function", `Expected ${name} to be exported`);
  return solutions[name];
}

const approaches = [
  "kthSmallestBruteForce",
  "kthSmallestInorder",
  "kthSmallestOptimized",
];

test("Kth Smallest in a BST: every approach returns the third smallest value", () => {
  for (const name of approaches) assert.equal(requireSolution(name)(buildTree(), 3), 3);
});

test("Kth Smallest in a BST: every approach handles the first and last values", () => {
  for (const name of approaches) {
    assert.equal(requireSolution(name)(buildTree(), 1), 1);
    assert.equal(requireSolution(name)(buildTree(), 6), 6);
  }
});

test("Kth Smallest in a BST: standard function uses the early-stop traversal", () => {
  assert.equal(requireSolution("kthSmallest")(buildTree(), 4), 4);
});
