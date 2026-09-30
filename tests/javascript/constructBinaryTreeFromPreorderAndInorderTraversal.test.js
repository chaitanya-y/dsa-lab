const assert = require("node:assert/strict");
const test = require("node:test");

let solutions = {};
try {
  solutions = require("../../javascript/problems/trees/constructBinaryTreeFromPreorderAndInorderTraversal");
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
global.TreeNode = TreeNode;

function treeShape(root) {
  if (root === null) return null;
  return [root.val, treeShape(root.left), treeShape(root.right)];
}

function requireSolution(name) {
  assert.equal(typeof solutions[name], "function", `Expected ${name} to be exported`);
  return solutions[name];
}

const approaches = [
  "buildTreeBruteForce",
  "buildTreeWithIndexMapAndSlices",
  "buildTreeOptimized",
];

test("Build Tree: every approach reconstructs the expected tree", () => {
  const preorder = [3, 9, 20, 15, 7];
  const inorder = [9, 3, 15, 20, 7];
  const expected = [3, [9, null, null], [20, [15, null, null], [7, null, null]]];

  for (const name of approaches) {
    assert.deepEqual(treeShape(requireSolution(name)(preorder, inorder)), expected);
  }
});

test("Build Tree: every approach reconstructs a right-skewed tree", () => {
  const expected = [1, null, [2, null, [3, null, null]]];
  for (const name of approaches) {
    assert.deepEqual(treeShape(requireSolution(name)([1, 2, 3], [1, 2, 3])), expected);
  }
});

test("Build Tree: every approach returns null for empty traversals", () => {
  for (const name of approaches) assert.equal(requireSolution(name)([], []), null);
});

test("Build Tree: standard function uses index ranges", () => {
  assert.deepEqual(
    treeShape(requireSolution("buildTree")([1, 2], [1, 2])),
    [1, null, [2, null, null]],
  );
});
