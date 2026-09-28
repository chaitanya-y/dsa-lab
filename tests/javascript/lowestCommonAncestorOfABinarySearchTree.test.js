const assert = require("node:assert/strict");
const test = require("node:test");

let solutions = {};
try {
  solutions = require("../../javascript/problems/trees/lowestCommonAncestorOfABinarySearchTree");
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

function buildBst() {
  const nodes = new Map([0, 2, 3, 4, 5, 6, 7, 8, 9].map((value) => [value, new TreeNode(value)]));
  nodes.get(6).left = nodes.get(2);
  nodes.get(6).right = nodes.get(8);
  nodes.get(2).left = nodes.get(0);
  nodes.get(2).right = nodes.get(4);
  nodes.get(8).left = nodes.get(7);
  nodes.get(8).right = nodes.get(9);
  nodes.get(4).left = nodes.get(3);
  nodes.get(4).right = nodes.get(5);
  return { root: nodes.get(6), nodes };
}

function requireSolution(name) {
  assert.equal(typeof solutions[name], "function", `Expected ${name} to be exported`);
  return solutions[name];
}

test("Lowest Common Ancestor of a BST: all approaches find the split and shared branch", () => {
  const approaches = [
    requireSolution("lowestCommonAncestorBruteForce"),
    requireSolution("lowestCommonAncestorRecursive"),
    requireSolution("lowestCommonAncestor"),
  ];

  for (const findAncestor of approaches) {
    const { root, nodes } = buildBst();
    assert.equal(findAncestor(root, nodes.get(2), nodes.get(8)), nodes.get(6));
    assert.equal(findAncestor(root, nodes.get(3), nodes.get(5)), nodes.get(4));
  }
});
