const assert = require("node:assert/strict");
const test = require("node:test");

let solutions = {};
try {
  solutions = require("../../javascript/problems/trees/validateBinarySearchTree");
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

function requireSolution(name) {
  assert.equal(typeof solutions[name], "function", `Expected ${name} to be exported`);
  return solutions[name];
}

const approaches = [
  "isValidBSTBruteForce",
  "isValidBSTInorder",
  "isValidBST",
];

test("Validate BST: all approaches accept a valid tree", () => {
  const root = new TreeNode(2, new TreeNode(1), new TreeNode(3));
  for (const name of approaches) assert.equal(requireSolution(name)(root), true);
});

test("Validate BST: all approaches reject a deep value outside an ancestor bound", () => {
  const root = new TreeNode(5, new TreeNode(1), new TreeNode(7, new TreeNode(3), new TreeNode(8)));
  for (const name of approaches) assert.equal(requireSolution(name)(root), false);
});

test("Validate BST: all approaches reject duplicate values", () => {
  const root = new TreeNode(2, new TreeNode(2), new TreeNode(3));
  for (const name of approaches) assert.equal(requireSolution(name)(root), false);
});
