const assert = require("node:assert/strict");
const test = require("node:test");

let solutions = {};
try {
  solutions = require("../../javascript/problems/trees/subtreeOfAnotherTree");
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

function exampleTrees() {
  const root = new TreeNode(3, new TreeNode(4, new TreeNode(1), new TreeNode(2)), new TreeNode(5));
  const matchingSubtree = new TreeNode(4, new TreeNode(1), new TreeNode(2));
  const differentShape = new TreeNode(4, new TreeNode(1));
  return { root, matchingSubtree, differentShape };
}

function requireSolution(name) {
  assert.equal(typeof solutions[name], "function", `Expected ${name} to be exported`);
  return solutions[name];
}

test("Subtree of Another Tree: DFS checks matching values and shape", () => {
  const isSubtree = requireSolution("isSubtreeDFS");
  const { root, matchingSubtree, differentShape } = exampleTrees();
  assert.equal(isSubtree(root, matchingSubtree), true);
  assert.equal(isSubtree(root, differentShape), false);
});

test("Subtree of Another Tree: serialized brute force finds and rejects matches", () => {
  const isSubtree = requireSolution("isSubtreeSerializedBruteForce");
  const { root, matchingSubtree, differentShape } = exampleTrees();
  assert.equal(isSubtree(root, matchingSubtree), true);
  assert.equal(isSubtree(root, differentShape), false);
});

test("Subtree of Another Tree: KMP finds and rejects serialized matches", () => {
  const isSubtree = requireSolution("isSubtreeKMP");
  const { root, matchingSubtree, differentShape } = exampleTrees();
  assert.equal(isSubtree(root, matchingSubtree), true);
  assert.equal(isSubtree(root, differentShape), false);
});

test("Subtree of Another Tree: standard method handles empty trees", () => {
  const isSubtree = requireSolution("isSubtree");
  assert.equal(isSubtree(new TreeNode(1), null), true);
  assert.equal(isSubtree(null, new TreeNode(1)), false);
});
