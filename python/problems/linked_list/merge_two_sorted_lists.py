"""Merge Two Sorted Lists.

Given the heads of two sorted linked lists, merge them into one sorted list.

Complexity variables: n and m = node counts in the two lists; N = n + m.
Brute force: O(N log N) time and O(N) extra space for a list of node references.
Optimized: O(N) time and O(1) extra space, reusing the input nodes.

Test file: tests/python/test_merge_two_sorted_lists.py
Run: PYTHONDONTWRITEBYTECODE=1 python3 -m unittest -v tests/python/test_merge_two_sorted_lists.py
"""

from __future__ import annotations  # Let the type hints refer to ListNode supplied by the judge or tests.

from typing import Optional  # Use Optional to show that an empty list has no head.


def merge_two_lists_brute_force(
    list1: Optional[ListNode], list2: Optional[ListNode]
) -> Optional[ListNode]:
    """Collect the nodes, sort them by value, and reconnect them."""
    nodes = []  # Store node references from both lists in one place.

    for head in (list1, list2):  # Process each input list.
        current = head  # Start at the head of this input list.
        while current is not None:  # Continue until this input list ends.
            nodes.append(current)  # Save the node before changing any links.
            current = current.next  # Move forward in the original list.

    nodes.sort(key=lambda node: node.val)  # Sort all saved nodes by their values.

    for index in range(len(nodes) - 1):  # Visit each node except the final sorted node.
        nodes[index].next = nodes[index + 1]  # Link to the next node in sorted order.

    if nodes:  # An empty pair of lists has no final node to update.
        nodes[-1].next = None  # Make the largest-valued node the end of the merged list.

    return nodes[0] if nodes else None  # Return the smallest node, or None if both lists were empty.


class _DummyNode:
    """A tiny sentinel node that needs only a next pointer."""

    def __init__(self):
        self.next = None  # The real merged list will be attached here.


class Solution:
    """Provide the linear-time two-pointer merge."""

    def mergeTwoLists(
        self, list1: Optional[ListNode], list2: Optional[ListNode]
    ) -> Optional[ListNode]:
        """Attach the smaller current node until one input list is exhausted."""
        dummy = _DummyNode()  # Keep a fixed node before the real answer to simplify its head.
        tail = dummy  # Track the last node currently in the merged list.

        while list1 is not None and list2 is not None:  # Compare while both lists still have nodes.
            if list1.val <= list2.val:  # The first list has the smaller next value (or a tie).
                tail.next = list1  # Attach its current node to the merged list.
                list1 = list1.next  # Advance only the first list.
            else:  # The second list has the smaller next value.
                tail.next = list2  # Attach its current node to the merged list.
                list2 = list2.next  # Advance only the second list.
            tail = tail.next  # Move the merged-list tail to the node just attached.

        if list1 is not None:  # The first list may have nodes left after the comparison loop.
            tail.next = list1  # Attach its already-sorted remainder in one step.
        else:  # Otherwise the second list may have nodes left.
            tail.next = list2  # Attach its already-sorted remainder in one step.

        return dummy.next  # Skip the sentinel and return the first real merged node.


if __name__ == "__main__":  # Run a small sample when this file is started directly.
    print("Run the named unittest file to test linked-list node examples.")  # Tests construct the ListNode objects.
