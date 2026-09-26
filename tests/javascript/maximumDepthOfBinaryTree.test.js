const assert = require("node:assert/strict");
const test = require("node:test");

let solutions = {};
try {
  solutions = require("../../javascript/problems/trees/maxDepthofBinaryTree");
} catch {
  // Keep a missing module/export as a readable assertion failure in the tests.
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

test("Maximum Depth: recursive DFS returns the tree height", () => {
  assert.equal(requireSolution("maxDepthRecursive")(buildTree()), 3);
});

test("Maximum Depth: iterative DFS returns the tree height", () => {
  assert.equal(requireSolution("maxDepthDFSIterative")(buildTree()), 3);
});

test("Maximum Depth: BFS counts the tree levels", () => {
  assert.equal(requireSolution("maxDepthBFS")(buildTree()), 3);
});

test("Maximum Depth: standard function name uses recursive DFS", () => {
  assert.equal(requireSolution("maxDepth")(buildTree()), 3);
});

test("Maximum Depth: all approaches return zero for an empty tree", () => {
  for (const name of ["maxDepthRecursive", "maxDepthDFSIterative", "maxDepthBFS"]) {
    assert.equal(requireSolution(name)(null), 0);
  }
});
