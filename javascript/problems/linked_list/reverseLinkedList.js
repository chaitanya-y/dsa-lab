// Reverse Linked List
// Given a singly linked list's head, reverse its links and return the new head.
//
// Complexity variable: n = number of nodes in the list.
// Brute force: O(n) time, O(n) extra space for the array of node references.
// Optimized: O(n) time, O(1) extra space using pointer reversal.
//
// Test file: tests/javascript/reverseLinkedList.test.js
// Run: node --test tests/javascript/reverseLinkedList.test.js

/** Save all nodes in an array, then reconnect them in reverse order. */
function reverseListBruteForce(head) {
  const nodes = []; // Keep node references so changing links won't lose nodes.
  let current = head; // Start at the original head.

  while (current !== null) { // Walk through the original list from front to back.
    nodes.push(current); // Save this node before changing any next pointers.
    current = current.next; // Move to the next node in the original list.
  }

  nodes.reverse(); // Put the saved node references in the order the new list needs.

  for (let index = 0; index < nodes.length - 1; index += 1) { // Visit all but the final reversed node.
    nodes[index].next = nodes[index + 1]; // Link to the next node in reversed order.
  }

  if (nodes.length > 0) { // An empty input has no final node to update.
    nodes[nodes.length - 1].next = null; // The old head is now the tail, so end the list here.
  }

  return nodes[0] ?? null; // The first reversed node is the new head, if one exists.
}

/** Reverse the links in place with three pointers. */
function reverseList(head) {
  let previous = null; // The reversed portion starts empty.
  let current = head; // Start at the first node in the original list.

  while (current !== null) { // Process each node until the original list ends.
    const nextNode = current.next; // Save the rest before changing this node's link.
    current.next = previous; // Point the current node backward into the reversed portion.
    previous = current; // The current node is now the first node of the reversed portion.
    current = nextNode; // Continue with the node saved before reversing the link.
  }

  return previous; // The last original node is the new head (or null for an empty list).
}

module.exports = { reverseList, reverseListBruteForce };
