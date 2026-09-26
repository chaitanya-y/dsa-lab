const assert = require("node:assert/strict");
const test = require("node:test");

let solutions = {};
try {
  solutions = require("../../javascript/problems/linked_list/mergeKSortedLists");
} catch {
  // Keep missing implementation as a readable assertion failure in the tests.
}

class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

function buildList(values) {
  let head = null;
  for (let index = values.length - 1; index >= 0; index -= 1) {
    head = new ListNode(values[index], head);
  }
  return head;
}

function buildLists(valuesByList) {
  return valuesByList.map(buildList);
}

function listValues(head) {
  const values = [];
  while (head !== null) {
    values.push(head.val);
    head = head.next;
  }
  return values;
}

function requireSolution(name) {
  assert.equal(typeof solutions[name], "function", `Expected ${name} to be exported`);
  return solutions[name];
}

test("Merge K Sorted Lists: flatten-and-sort approach merges all nodes", () => {
  const merge = requireSolution("mergeKListsBruteForce");
  const result = merge(buildLists([[1, 4, 5], [1, 3, 4], [2, 6]]));
  assert.deepEqual(listValues(result), [1, 1, 2, 3, 4, 4, 5, 6]);
});

test("Merge K Sorted Lists: sequential approach merges each list", () => {
  const merge = requireSolution("mergeKListsSequential");
  const result = merge(buildLists([[1, 4, 5], [1, 3, 4], [2, 6]]));
  assert.deepEqual(listValues(result), [1, 1, 2, 3, 4, 4, 5, 6]);
});

test("Merge K Sorted Lists: pairwise approach handles an odd number of lists", () => {
  const merge = requireSolution("mergeKListsPairwise");
  const result = merge(buildLists([[1, 4], [2, 3], [5, 7]]));
  assert.deepEqual(listValues(result), [1, 2, 3, 4, 5, 7]);
});

test("Merge K Sorted Lists: heap approach handles duplicate values", () => {
  const merge = requireSolution("mergeKLists");
  const result = merge(buildLists([[1, 1], [1, 2], [1, 3]]));
  assert.deepEqual(listValues(result), [1, 1, 1, 1, 2, 3]);
});

test("Merge K Sorted Lists: all approaches handle no lists", () => {
  for (const name of [
    "mergeKListsBruteForce",
    "mergeKListsSequential",
    "mergeKListsPairwise",
    "mergeKLists",
  ]) {
    assert.equal(requireSolution(name)([]), null, `${name} should return null`);
  }
});
