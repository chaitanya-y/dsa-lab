const assert = require("node:assert/strict");
const test = require("node:test");
const {
  reverseList,
  reverseListBruteForce,
} = require("../../javascript/problems/linked_list/reverseLinkedList");

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

test("Reverse Linked List: brute force reverses all nodes", () => {
  assert.deepEqual(listValues(reverseListBruteForce(buildList([1, 2, 3, 4]))), [4, 3, 2, 1]);
});

test("Reverse Linked List: brute force handles an empty list", () => {
  assert.equal(reverseListBruteForce(null), null);
});

test("Reverse Linked List: iterative solution reverses all nodes", () => {
  assert.deepEqual(listValues(reverseList(buildList([1, 2, 3, 4]))), [4, 3, 2, 1]);
});

test("Reverse Linked List: iterative solution handles a single node", () => {
  assert.deepEqual(listValues(reverseList(buildList([7]))), [7]);
});
