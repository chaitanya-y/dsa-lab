const assert = require("node:assert/strict");
const test = require("node:test");

let solutions = {};
try {
  solutions = require("../../javascript/problems/trees/isSameBinaryTree");
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

function matchingTrees() {
  return [
    new TreeNode(1, new TreeNode(2), new TreeNode(3, new TreeNode(4))),
    new TreeNode(1, new TreeNode(2), new TreeNode(3, new TreeNode(4))),
  ];
}

function requireSolution(name) {
  assert.equal(typeof solutions[name], "function", `Expected ${name} to be exported`);
  return solutions[name];
}

test("Same Tree: recursive DFS recognizes matching trees", () => {
  assert.equal(requireSolution("isSameTreeRecursive")(...matchingTrees()), true);
});

test("Same Tree: iterative DFS detects value and shape differences", () => {
  const compare = requireSolution("isSameTreeDFSIterative");
  assert.equal(compare(new TreeNode(1, new TreeNode(2)), new TreeNode(1, new TreeNode(3))), false);
  assert.equal(compare(new TreeNode(1, new TreeNode(2)), new TreeNode(1, null, new TreeNode(2))), false);
});

test("Same Tree: BFS recognizes matching trees", () => {
  assert.equal(requireSolution("isSameTreeBFS")(...matchingTrees()), true);
});

test("Same Tree: standard function handles empty and mismatched trees", () => {
  const compare = requireSolution("isSameTree");
  assert.equal(compare(null, null), true);
  assert.equal(compare(new TreeNode(1), null), false);
});
