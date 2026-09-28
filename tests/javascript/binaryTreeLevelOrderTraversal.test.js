const assert = require("node:assert/strict");
const test = require("node:test");

let solutions = {};
try {
  solutions = require("../../javascript/problems/trees/binaryTreeLevelOrderTraversal");
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
  return new TreeNode(1, new TreeNode(2, new TreeNode(4)), new TreeNode(3, null, new TreeNode(5)));
}

function requireSolution(name) {
  assert.equal(typeof solutions[name], "function", `Expected ${name} to be exported`);
  return solutions[name];
}

test("Binary Tree Level Order Traversal: all approaches group nodes by level", () => {
  for (const name of ["levelOrderBruteForce", "levelOrderDFS", "levelOrder"]) {
    assert.deepEqual(requireSolution(name)(buildTree()), [[1], [2, 3], [4, 5]]);
  }
});

test("Binary Tree Level Order Traversal: all approaches handle an empty tree", () => {
  for (const name of ["levelOrderBruteForce", "levelOrderDFS", "levelOrder"]) {
    assert.deepEqual(requireSolution(name)(null), []);
  }
});
