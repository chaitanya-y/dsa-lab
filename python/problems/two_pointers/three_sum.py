"""3Sum.

Return every unique group of three numbers whose sum is 0.

Example: [-1, 0, 1, 2, -1, -4] returns
[[-1, -1, 2], [-1, 0, 1]].

n = number of values in nums.

How to test:
Test file: tests/python/test_three_sum.py
Run: PYTHONDONTWRITEBYTECODE=1 python3 -m unittest -v tests/python/test_three_sum.py
"""


def three_sum_brute_force(nums: list[int]) -> list[list[int]]:
    """Try every possible group of three indexes.

    Time: O(n^3), because three nested loops can each run n times.
    Space: O(n), for the unique triplets we return.
    """
    # A set stores each triplet only once.
    unique_triplets = set()

    # Choose the first index of a triplet.
    for first in range(len(nums) - 2):
        # Choose the second index after the first index.
        for second in range(first + 1, len(nums) - 1):
            # Choose the third index after the second index.
            for third in range(second + 1, len(nums)):
                # Add the values at the three chosen indexes.
                total = nums[first] + nums[second] + nums[third]

                # Keep only groups whose total is zero.
                if total == 0:
                    # Sort the values so the same triplet has one standard order.
                    triplet = tuple(sorted([nums[first], nums[second], nums[third]]))
                    # Add the immutable tuple to the set.
                    unique_triplets.add(triplet)

    # Change tuples back to lists because the required answer uses lists.
    return [list(triplet) for triplet in unique_triplets]


class Solution:
    def threeSum(self, nums: list[int]) -> list[list[int]]:
        """Sort, fix one number, and find the other two with two pointers.

        Time: O(n^2): sorting is O(n log n), then the outer loop and each
        two-pointer scan together do O(n) * O(n) work.
        Space: O(n), for the sorted copy and returned triplets.
        """
        # Make a sorted copy so we do not change the input list.
        sorted_nums = sorted(nums)
        # Store the unique zero-sum triplets.
        triplets = []

        # Fix one number; two positions must remain for left and right.
        for i in range(len(sorted_nums) - 2):
            # Skip the same fixed value because it would create duplicate triplets.
            if i > 0 and sorted_nums[i] == sorted_nums[i - 1]:
                continue

            # Start left immediately after the fixed number.
            left = i + 1
            # Start right at the last number.
            right = len(sorted_nums) - 1

            # Continue until left and right meet.
            while left < right:
                # Add the fixed number and the two pointer values.
                total = sorted_nums[i] + sorted_nums[left] + sorted_nums[right]

                # The total is too small, so choose a larger left number.
                if total < 0:
                    left += 1
                # The total is too large, so choose a smaller right number.
                elif total > 0:
                    right -= 1
                else:
                    # The three values add to zero, so save this triplet.
                    triplets.append([sorted_nums[i], sorted_nums[left], sorted_nums[right]])
                    # Move away from the pair we just used.
                    left += 1
                    right -= 1

                    # We already saved a triplet using the old left value.
                    # After `left += 1`, left may point to the same value again.
                    # Example: after saving [-2, 0, 2], another 0 would make
                    # [-2, 0, 2] again, which is a duplicate answer.
                    # Compare the new value with the previous left value and
                    # keep moving while they are equal. `left < right` makes
                    # sure the two pointers have not crossed.
                    while left < right and sorted_nums[left] == sorted_nums[left - 1]:
                        left += 1

                    # The left skip already prevents duplicate output here.
                    # This right skip also avoids repeated checks and keeps both sides symmetric.
                    while left < right and sorted_nums[right] == sorted_nums[right + 1]:
                        right -= 1

        # Return every unique triplet we found.
        return triplets
