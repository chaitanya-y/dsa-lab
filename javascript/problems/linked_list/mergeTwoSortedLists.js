// Merge Two Sorted Lists
// Merge two sorted linked lists and return the head of the sorted result.
//
// Complexity variables: n and m = node counts in the two lists; N = n + m.
// Brute force: O(N log N) time, O(N) extra space for the node-reference array.
// Optimized: O(N) time, O(1) extra space; the input nodes are reused.
//
// Test file: tests/javascript/mergeTwoSortedLists.test.js
// Run: node --test tests/javascript/mergeTwoSortedLists.test.js

/** Collect all nodes, sort them by value, and reconnect them. */
function mergeTwoListsBruteForce(list1, list2) {
  const nodes = []; // Store references to nodes from both input lists.

  for (let current = list1; current !== null; current = current.next) { // Visit every node in the first list.
    nodes.push(current); // Save the node before changing any links.
  }
  for (let current = list2; current !== null; current = current.next) { // Visit every node in the second list.
    nodes.push(current); // Save the node before changing any links.
  }

  nodes.sort((first, second) => first.val - second.val); // Put all nodes in ascending value order.

  for (let index = 0; index < nodes.length - 1; index += 1) { // Visit each node except the final sorted node.
    nodes[index].next = nodes[index + 1]; // Link to the next node in sorted order.
  }

  if (nodes.length > 0) { // Two empty lists have no final node to update.
    nodes[nodes.length - 1].next = null; // Make the largest-valued node the end of the merged list.
  }

  return nodes[0] ?? null; // Return the smallest node, or null if both lists were empty.
}

/** Merge directly by repeatedly attaching the smaller of the two front nodes. */
function mergeTwoLists(list1, list2) {
  const dummy = { next: null }; // Sentinel simplifies returning the first real node.
  let tail = dummy; // Track the final node currently in the merged list.

  while (list1 !== null && list2 !== null) { // Compare while both lists still have nodes.
    if (list1.val <= list2.val) { // The first list has the smaller next value (or a tie).
      tail.next = list1; // Attach its current node to the merged list.
      list1 = list1.next; // Advance only the first list.
    } else { // The second list has the smaller next value.
      tail.next = list2; // Attach its current node to the merged list.
      list2 = list2.next; // Advance only the second list.
    }
    tail = tail.next; // Move the merged-list tail to the node just attached.
  }

  tail.next = list1 ?? list2; // Attach the remaining sorted nodes without visiting them again.
  return dummy.next; // Skip the sentinel and return the first real merged node.
}

module.exports = { mergeTwoLists, mergeTwoListsBruteForce };
