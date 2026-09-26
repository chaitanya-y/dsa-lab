"""Merge K Sorted Lists.

Given k sorted linked lists, combine them into one sorted linked list.
Each approach reuses the input nodes and returns the merged head.

Complexity variables: k = number of lists; N = total number of nodes.

How to test:
Test file: tests/python/test_merge_k_sorted_lists.py
Run: PYTHONDONTWRITEBYTECODE=1 python3 -m unittest -v tests/python/test_merge_k_sorted_lists.py
"""

from __future__ import annotations  # Allow judge-provided ListNode type hints.

import heapq  # Provide a min-heap for the optimized solution.
from itertools import count  # Give equal-valued heap nodes a unique tie-breaker.


class _DummyNode:
    """A tiny sentinel node; it avoids needing to construct a judge ListNode."""

    def __init__(self):
        self.next = None  # The real merged list will begin after this helper.


def _merge_two_lists(list1, list2):
    """Merge two sorted lists by repeatedly attaching the smaller front node."""
    dummy = _DummyNode()  # Keep a stable node before the merged result.
    tail = dummy  # Track the end of the merged portion.

    while list1 is not None and list2 is not None:  # Compare until either list runs out.
        if list1.val <= list2.val:  # The first list has the smaller current value.
            tail.next = list1  # Attach that node to the merged result.
            list1 = list1.next  # Advance only the list we used.
        else:  # The second list has the smaller current value.
            tail.next = list2  # Attach that node to the merged result.
            list2 = list2.next  # Advance only the list we used.
        tail = tail.next  # Move the merged-result tail forward.

    tail.next = list1 if list1 is not None else list2  # Append the sorted remainder.
    return dummy.next  # Skip the helper and return the real result head.


def merge_k_lists_brute_force(lists: list[Optional[ListNode]]) -> Optional[ListNode]:
    """Brute force: collect all nodes, sort them, and reconnect them.

    How this solution works:
    1. Walk every input list and put its node references into one array.
    2. Sort all nodes by their values.
    3. Link the nodes in sorted order and end the final node with None.

    Complexity variables: k = number of lists; N = total number of nodes.
    Time: O(N log N), for sorting all N node references.
    Extra space: O(N), for the array of node references.
    """
    nodes = []  # Hold each node so all lists can be sorted together.

    for head in lists:  # Visit every input list.
        current = head  # Begin at this list's first node.
        while current is not None:  # Continue until this list ends.
            nodes.append(current)  # Save the node before changing any links.
            current = current.next  # Follow the original link to the next node.

    nodes.sort(key=lambda node: node.val)  # Arrange every node by its value.

    for index in range(len(nodes) - 1):  # Visit all nodes except the final one.
        nodes[index].next = nodes[index + 1]  # Link to the next sorted node.

    if nodes:  # Only a non-empty result has a final node to terminate.
        nodes[-1].next = None  # Ensure the merged list ends instead of looping.

    return nodes[0] if nodes else None  # Return the smallest node, or None.


def merge_k_lists_sequential(lists: list[Optional[ListNode]]) -> Optional[ListNode]:
    """Sequential merge: merge one new list into the result at a time.

    How this solution works:
    1. Start with an empty merged result.
    2. Merge the next sorted list into the result using a two-list merge.
    3. Continue until every input list has been included.

    Complexity variables: k = number of lists; N = total number of nodes.
    Time: O(N * k) in the worst case because nodes may be revisited for each list.
    Extra space: O(1), excluding the input list of heads and returned links.
    """
    merged_head = None  # The result starts as an empty linked list.

    for head in lists:  # Add the input lists one at a time.
        merged_head = _merge_two_lists(merged_head, head)  # Keep the result sorted.

    return merged_head  # Return the head after every list has been merged.


def merge_k_lists_pairwise(lists: list[Optional[ListNode]]) -> Optional[ListNode]:
    """Pairwise merge: merge lists in rounds, as in a tournament.

    How this solution works:
    1. Pair neighboring list heads and merge each pair.
    2. Carry an unpaired final list into the next round unchanged.
    3. Repeat with the smaller set of merged lists until one remains.
    This is the divide-and-conquer approach from the submitted solution.

    Complexity variables: k = number of lists; N = total number of nodes.
    Time: O(N log k), because each node participates in about log k merge rounds.
    Extra space: O(k), for the temporary arrays of list heads across rounds.
    """
    current_lists = list(lists)  # Work on a copy so the caller's head array stays intact.

    while len(current_lists) > 1:  # Each round cuts the number of lists roughly in half.
        merged_lists = []  # Store the output list head for each pair in this round.

        for index in range(0, len(current_lists), 2):  # Visit pairs of list heads.
            list1 = current_lists[index]  # Take the first list in this pair.
            list2 = current_lists[index + 1] if index + 1 < len(current_lists) else None  # The final list may have no partner.
            merged_lists.append(_merge_two_lists(list1, list2))  # Merge this pair (or keep its single list).

        current_lists = merged_lists  # Start the next round with the new, shorter list array.

    return current_lists[0] if current_lists else None  # Return the only result, or None for no lists.


class Solution:
    """Provide the min-heap solution used as the optimal interview approach."""

    def mergeKLists(self, lists: list[Optional[ListNode]]) -> Optional[ListNode]:
        """Optimized: always take the smallest currently available list head.

        How this solution works:
        1. Put the first node of each non-empty list into a min-heap.
        2. Remove the smallest node and append it to the result.
        3. Add that node's next node to the heap, if it exists.
        4. Repeat until no list has an unmerged node left.
        The counter breaks ties so Python never needs to compare ListNode objects.

        Complexity variables: k = number of lists; N = total number of nodes.
        Time: O(N log k), because each node is pushed/popped with a heap of size <= k.
        Extra space: O(k), for the heap.
        """
        smallest_nodes = []  # The heap stores the smallest unmerged node from each list.
        tie_breaker = count()  # Ensure equal values never make Python compare node objects.

        for head in lists:  # Add the first node from every non-empty input list.
            if head is not None:  # Empty lists have no node to add.
                heapq.heappush(smallest_nodes, (head.val, next(tie_breaker), head))  # Order heap entries by value.

        dummy = _DummyNode()  # Keep a stable helper before the result.
        tail = dummy  # Track where the next minimum node will be attached.

        while smallest_nodes:  # Continue while some node is available to merge.
            _, _, smallest_node = heapq.heappop(smallest_nodes)  # Take the least-valued current node.
            next_node = smallest_node.next  # Save its successor before changing its link.
            tail.next = smallest_node  # Append the smallest node to the output list.
            tail = smallest_node  # Move the output tail to the node just appended.
            tail.next = None  # Detach it so the output link is always explicit.

            if next_node is not None:  # Only add a successor when this source list continues.
                heapq.heappush(smallest_nodes, (next_node.val, next(tie_breaker), next_node))  # Make it available for the next minimum check.

        return dummy.next  # Return the first real node, or None when all lists were empty.


if __name__ == "__main__":  # The judge provides ListNode; the unit test constructs sample nodes.
    print("Run the named unittest file to test Merge K Sorted Lists.")  # Point to the exact test command.
