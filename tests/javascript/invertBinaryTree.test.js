const assert = require("node:assert/strict");
const test = require("node:test");
const solutions = require("../../javascript/problems/trees/invertBinaryTree");

class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildTree() {
  return new TreeNode(
    4,
    new TreeNode(2, new TreeNode(1), new TreeNode(3)),
    new TreeNode(7, new TreeNode(6), new TreeNode(9)),
  );
}

function treeShape(node) {
  if (node === null) return null;
  return [node.val, treeShape(node.left), treeShape(node.right)];
}

function requireSolution(name) {
  assert.equal(typeof solutions[name], "function", `Expected ${name} to be exported`);
  return solutions[name];
}

const expectedInverted = [
  4,
  [7, [9, null, null], [6, null, null]],
  [2, [3, null, null], [1, null, null]],
];

test("Invert Binary Tree: recursive DFS swaps every node", () => {
  assert.deepEqual(treeShape(requireSolution("invertTreeRecursive")(buildTree())), expectedInverted);
});

test("Invert Binary Tree: iterative DFS swaps every node", () => {
  assert.deepEqual(treeShape(requireSolution("invertTreeDFSIterative")(buildTree())), expectedInverted);
});

test("Invert Binary Tree: BFS swaps every node", () => {
  assert.deepEqual(treeShape(requireSolution("invertTreeBFS")(buildTree())), expectedInverted);
});

test("Invert Binary Tree: standard function name uses recursive DFS", () => {
  assert.deepEqual(treeShape(requireSolution("invertTree")(buildTree())), expectedInverted);
});

test("Invert Binary Tree: all approaches handle an empty tree", () => {
  for (const name of ["invertTreeRecursive", "invertTreeDFSIterative", "invertTreeBFS"]) {
    assert.equal(requireSolution(name)(null), null);
  }
});
