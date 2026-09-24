const assert = require("node:assert/strict");
const test = require("node:test");
const {
  mergeTwoLists,
  mergeTwoListsBruteForce,
} = require("../../javascript/problems/linked_list/mergeTwoSortedLists");

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

function listValues(head) {
  const values = [];
  while (head !== null) {
    values.push(head.val);
    head = head.next;
  }
  return values;
}

test("Merge Two Sorted Lists: brute force merges values in sorted order", () => {
  const result = mergeTwoListsBruteForce(buildList([1, 2, 4]), buildList([1, 3, 5]));
  assert.deepEqual(listValues(result), [1, 1, 2, 3, 4, 5]);
});

test("Merge Two Sorted Lists: brute force handles two empty lists", () => {
  assert.equal(mergeTwoListsBruteForce(null, null), null);
});

test("Merge Two Sorted Lists: two-pointer solution merges in sorted order", () => {
  const result = mergeTwoLists(buildList([1, 2, 4]), buildList([1, 3, 5]));
  assert.deepEqual(listValues(result), [1, 1, 2, 3, 4, 5]);
});

test("Merge Two Sorted Lists: two-pointer solution returns the nonempty list", () => {
  const result = mergeTwoLists(null, buildList([2, 3]));
  assert.deepEqual(listValues(result), [2, 3]);
});
