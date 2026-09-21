"""Container With Most Water.

Choose two vertical lines that hold the most water.
Water = distance between the lines * shorter line height.

n = number of heights.

How to test:
Test file: tests/python/test_container_with_most_water.py
Run: PYTHONDONTWRITEBYTECODE=1 python3 -m unittest -v tests/python/test_container_with_most_water.py
"""


def max_area_brute_force(heights: list[int]) -> int:
    """Calculate the water area for every possible pair of lines.

    Time: O(n^2), because two loops try every pair.
    Space: O(1), because only a few variables are stored.
    """
    # Store the largest area found so far.
    largest_area = 0

    # Choose the left wall.
    for left in range(len(heights) - 1):
        # Choose every right wall after the left wall.
        for right in range(left + 1, len(heights)):
            # The index distance is the container width.
            width = right - left
            # The shorter wall limits the water height.
            shorter_height = min(heights[left], heights[right])
            # Multiply width by water height to get the area.
            area = width * shorter_height
            # Keep the biggest area seen so far.
            largest_area = max(largest_area, area)

    # Return the largest area after checking every pair.
    return largest_area


class Solution:
    def maxArea(self, heights: list[int]) -> int:
        """Start wide, then move the shorter wall inward.

        Time: O(n), because left and right move inward at most n times total.
        Space: O(1), because only indexes and area variables are stored.
        """
        # Begin with the leftmost wall.
        left = 0
        # Begin with the rightmost wall.
        right = len(heights) - 1
        # Store the largest area found so far.
        largest_area = 0

        # Stop when the pointers meet because one wall cannot form a container.
        while left < right:
            # The distance between indexes is the container width.
            width = right - left
            # The shorter wall limits the water height.
            shorter_height = min(heights[left], heights[right])
            # Calculate the current container area.
            area = width * shorter_height
            # Save the current area if it is the new largest area.
            largest_area = max(largest_area, area)

            # Moving the taller wall cannot help: width shrinks while the
            # shorter wall still limits the height. Move the shorter wall to
            # search for a taller limiting wall instead.
            if heights[left] < heights[right]:
                left += 1
            else:
                # When right is shorter or equal, move the right pointer.
                right -= 1

        # Return the largest area found by the two pointers.
        return largest_area
