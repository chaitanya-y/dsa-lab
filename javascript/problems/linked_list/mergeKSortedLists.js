// Merge K Sorted Lists
// Merge k individually sorted linked lists into one sorted linked list.
// Each approach reuses the input nodes and returns the merged head.
// Complexity variables: k = number of lists; N = total number of nodes.
//
// How to test:
// Test file: tests/javascript/mergeKSortedLists.test.js
// Run: node --test tests/javascript/mergeKSortedLists.test.js

/** Merge two sorted lists by repeatedly attaching the smaller front node. */
function mergeTwoSortedLists(list1, list2) {
  const dummy = { next: null }; // A plain helper avoids constructing the judge's ListNode.
  let tail = dummy; // Track the final node currently in the merged part.

  while (list1 !== null && list2 !== null) { // Compare while both lists have nodes.
    if (list1.val <= list2.val) { // The first list has the smaller current value or a tie.
      tail.next = list1; // Append the first list's current node.
      list1 = list1.next; // Advance only the list we used.
    } else { // The second list has the smaller current value.
      tail.next = list2; // Append the second list's current node.
      list2 = list2.next; // Advance only the list we used.
    }
    tail = tail.next; // Move the merged-list tail forward.
  }

  tail.next = list1 !== null ? list1 : list2; // Append the already-sorted remainder.
  return dummy.next; // Skip the helper and return the real result head.
}

/**
 * Brute force: collect every node, sort by value, and reconnect them.
 * How this solution works:
 * 1. Walk all lists and save their node references in one array.
 * 2. Sort that array by node value.
 * 3. Link the nodes in sorted order and end the final node with null.
 * Complexity: O(N log N) time and O(N) extra space, where N is total node count.
 */
function mergeKListsBruteForce(lists) {
  const nodes = []; // Keep references to every input node before changing links.

  for (const head of lists) { // Visit each input list.
    let current = head; // Start at this list's first node.
    while (current !== null) { // Continue until this list ends.
      nodes.push(current); // Save the node so all nodes can be sorted together.
      current = current.next; // Follow the original link to the next node.
    }
  }

  nodes.sort((first, second) => first.val - second.val); // Sort nodes by their values.

  for (let index = 0; index < nodes.length - 1; index += 1) { // Visit all but the final node.
    nodes[index].next = nodes[index + 1]; // Link to the next node in sorted order.
  }

  if (nodes.length > 0) { // Only a non-empty output has a final node to terminate.
    nodes[nodes.length - 1].next = null; // Ensure the result does not keep an old link.
  }

  return nodes[0] ?? null; // Return the smallest node, or null when no nodes exist.
}

/**
 * Sequential merge: add each list to the result one at a time.
 * How this solution works:
 * 1. Start with an empty result list.
 * 2. Merge the next sorted input list with the result.
 * 3. Repeat until every input list has been included.
 * Complexity: O(N * k) time in the worst case and O(1) extra space, where k is
 * the number of lists and N is their total number of nodes.
 */
function mergeKListsSequential(lists) {
  let mergedHead = null; // The accumulated result starts empty.

  for (const head of lists) { // Add each input list in order.
    mergedHead = mergeTwoSortedLists(mergedHead, head); // Keep the result sorted after each merge.
  }

  return mergedHead; // Return the result after all lists have been added.
}

/**
 * Pairwise divide and conquer: merge neighboring lists in repeated rounds.
 * How this solution works:
 * 1. Pair neighboring list heads and merge each pair.
 * 2. Carry the final list forward unchanged when a round has an odd count.
 * 3. Repeat with the smaller set until only one merged list remains.
 * This is the divide-and-conquer approach from the submitted solution.
 * Complexity: O(N log k) time and O(k) extra space for temporary arrays of heads.
 */
function mergeKListsPairwise(lists) {
  let currentLists = [...lists]; // Copy the head array so the caller's array stays intact.

  while (currentLists.length > 1) { // Each pass reduces the number of lists roughly by half.
    const mergedLists = []; // Store the output head for every pair in this round.

    for (let index = 0; index < currentLists.length; index += 2) { // Visit two lists at a time.
      const list1 = currentLists[index]; // Take the first list in this pair.
      const list2 = currentLists[index + 1] ?? null; // An odd final list may have no partner.
      mergedLists.push(mergeTwoSortedLists(list1, list2)); // Merge this pair or carry one list forward.
    }

    currentLists = mergedLists; // Start another round with the new list heads.
  }

  return currentLists[0] ?? null; // Return the only remaining list, or null for no lists.
}

/** A small min-heap that orders ListNodes by their value. */
class ListNodeMinHeap {
  constructor() {
    this.nodes = []; // Store heap values in the standard array layout.
  }

  get size() {
    return this.nodes.length; // The array length is the number of available nodes.
  }

  push(node) {
    this.nodes.push(node); // Put the new node at the end before bubbling it upward.
    let childIndex = this.nodes.length - 1; // Start bubbling from its new position.

    while (childIndex > 0) { // Stop when it reaches the root of the heap.
      const parentIndex = Math.floor((childIndex - 1) / 2); // Find its parent in the array heap.
      if (this.nodes[parentIndex].val <= this.nodes[childIndex].val) break; // Stop when heap order is satisfied.
      [this.nodes[parentIndex], this.nodes[childIndex]] = [this.nodes[childIndex], this.nodes[parentIndex]]; // Swap with a larger parent.
      childIndex = parentIndex; // Continue from the parent's old position.
    }
  }

  pop() {
    if (this.nodes.length === 0) return null; // An empty heap has no minimum node.

    const minimum = this.nodes[0]; // The root always holds the smallest node.
    const last = this.nodes.pop(); // Remove the final node so it can replace the root.

    if (this.nodes.length > 0) { // Restore heap order only when nodes remain.
      this.nodes[0] = last; // Move the last node to the root temporarily.
      let parentIndex = 0; // Start pushing the replacement down from the root.

      while (true) { // Stop when both children are no smaller than this node.
        const leftIndex = parentIndex * 2 + 1; // Find the left child position.
        const rightIndex = parentIndex * 2 + 2; // Find the right child position.
        let smallerIndex = parentIndex; // Assume the current node is the smallest.

        if (leftIndex < this.nodes.length && this.nodes[leftIndex].val < this.nodes[smallerIndex].val) { // Check whether the left child is smaller.
          smallerIndex = leftIndex; // Remember the smaller left child.
        }
        if (rightIndex < this.nodes.length && this.nodes[rightIndex].val < this.nodes[smallerIndex].val) { // Check whether the right child is smallest.
          smallerIndex = rightIndex; // Remember the smaller right child.
        }
        if (smallerIndex === parentIndex) break; // This part of the heap is now ordered.

        [this.nodes[parentIndex], this.nodes[smallerIndex]] = [this.nodes[smallerIndex], this.nodes[parentIndex]]; // Move the smaller child up.
        parentIndex = smallerIndex; // Continue from the child's old position.
      }
    }

    return minimum; // Return the node that was at the root.
  }
}

/**
 * Optimized min-heap solution: repeatedly append the smallest current list head.
 * How this solution works:
 * 1. Put the first node of every non-empty list into a min-heap.
 * 2. Remove and append the smallest node currently available.
 * 3. Add that node's next node to the heap, if it has one.
 * 4. Continue until the heap is empty.
 * Complexity: O(N log k) time and O(k) extra space, where k is list count and
 * N is their total number of nodes.
 */
function mergeKLists(lists) {
  const heap = new ListNodeMinHeap(); // Keep the next unmerged node from each list.

  for (const head of lists) { // Add the first node of each non-empty input list.
    if (head !== null) heap.push(head); // Empty lists do not contribute heap nodes.
  }

  const dummy = { next: null }; // A plain sentinel avoids constructing a judge ListNode.
  let tail = dummy; // Track where to append the next smallest node.

  while (heap.size > 0) { // Continue while some node is ready to merge.
    const smallestNode = heap.pop(); // Take the minimum-valued current node.
    const nextNode = smallestNode.next; // Save its successor before changing its link.
    tail.next = smallestNode; // Append the smallest node to the sorted answer.
    tail = smallestNode; // Advance the output tail to the node just appended.
    tail.next = null; // Detach it so the answer chain is built explicitly.

    if (nextNode !== null) heap.push(nextNode); // Make this source list's next node available.
  }

  return dummy.next; // Return the merged head, or null when all input lists are empty.
}

module.exports = { mergeKLists, mergeKListsBruteForce, mergeKListsPairwise, mergeKListsSequential };
