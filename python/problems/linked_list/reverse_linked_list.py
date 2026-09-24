"""Reverse Linked List.

Given the head of a singly linked list, reverse its links and return the new head.

Complexity variables: n = number of nodes in the list.
Brute force: O(n) time and O(n) extra space for an array of node references.
Optimized: O(n) time and O(1) extra space using pointer reversal.

Test file: tests/python/test_reverse_linked_list.py
Run: PYTHONDONTWRITEBYTECODE=1 python3 -m unittest -v tests/python/test_reverse_linked_list.py
"""

from __future__ import annotations  # Let the type hints refer to ListNode supplied by the judge or tests.

from typing import Optional  # Use Optional to show that an empty list has no head.


def reverse_list_brute_force(head: Optional[ListNode]) -> Optional[ListNode]:
    """Save all nodes in an array, then reconnect them in reverse order."""
    nodes = []  # Keep references to every node so changing links won't lose nodes.
    current = head  # Begin at the original head.

    while current is not None:  # Walk through the original list from front to back.
        nodes.append(current)  # Save this node before any next pointers are changed.
        current = current.next  # Move to the next node in the original list.

    nodes.reverse()  # Put the saved node references in the order the new list needs.

    for index in range(len(nodes) - 1):  # Visit each node except the final node.
        nodes[index].next = nodes[index + 1]  # Link it to the next node in reversed order.

    if nodes:  # An empty input has no final node to update.
        nodes[-1].next = None  # The old head is now the tail, so end the list here.

    return nodes[0] if nodes else None  # The first reversed node is the new head, if any.


class Solution:
    """Provide the in-place pointer-reversal solution."""

    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        """Reverse the links by walking through the list once."""
        previous = None  # The reversed portion starts empty.
        current = head  # Start at the first node in the original list.

        while current is not None:  # Process each node until the original list ends.
            next_node = current.next  # Save the rest of the list before changing this link.
            current.next = previous  # Point the current node backward into the reversed portion.
            previous = current  # The current node is now the first node of the reversed portion.
            current = next_node  # Continue with the node we saved before reversing the link.

        return previous  # The last original node is the new head (or None for an empty list).


if __name__ == "__main__":  # Run a small sample when this file is started directly.
    print("Run the named unittest file to test linked-list node examples.")  # Tests construct the ListNode objects.
