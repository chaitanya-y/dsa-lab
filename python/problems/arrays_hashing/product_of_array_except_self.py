"""Product of Array Except Self.

Given nums, make answer where answer[i] is the product of every value except
nums[i]. Do not use division.

Example: nums = [2, 3, 4]
- index 0: 3 * 4 = 12
- index 1: 2 * 4 = 8
- index 2: 2 * 3 = 6
answer = [12, 8, 6]

n = the number of values in nums.

How to test:
Test file: tests/python/test_product_of_array_except_self.py
Run: PYTHONDONTWRITEBYTECODE=1 python3 -m unittest -v tests/python/test_product_of_array_except_self.py
"""


def product_except_self_brute_force(nums):
    """Method 1: multiply every other number for each index.

    This repeats work, because we loop over nums once for every index.

    Time: O(n^2): the outer loop and inner loop both can run n times.
    Extra space: O(1), not counting the answer list we must return.
    """
    answer = []

    for i in range(len(nums)):
        product = 1

        for j in range(len(nums)):
            if i != j:
                product *= nums[j]

        answer.append(product)

    return answer


def product_except_self_with_arrays(nums):
    """Method 2: store products from the left and right separately.

    left[i] is the product of values before index i.
    right[i] is the product of values after index i.

    For [2, 3, 4]:
    left  = [1, 2, 6]
    right = [12, 4, 1]
    answer = [12, 8, 6]

    1 means "no numbers on this side." It does not change a product.

    Time: O(n): each loop visits nums once.
    Extra space: O(n): left and right are extra lists.
    """
    n = len(nums)
    left = [1] * n
    right = [1] * n

    for i in range(1, n):
        left[i] = left[i - 1] * nums[i - 1]

    # range(n - 2, -1, -1) starts at the second-last index and counts down.
    # It stops before -1, so index 0 is included.
    for i in range(n - 2, -1, -1):
        right[i] = right[i + 1] * nums[i + 1]

    return [left[i] * right[i] for i in range(n)]


class Solution:
    def productExceptSelf(self, nums):
        """Method 3: the optimized left/right idea using only answer.

        First, answer stores the product before each index. Then suffix keeps
        the running product after each index while we move right to left.

        Time: O(n): two passes through nums.
        Extra space: O(1), not counting answer. We reuse the required output
        list instead of making separate left and right lists.
        """
        answer = [1] * len(nums)

        # Put the product of values before i into answer[i].
        prefix = 1
        for i in range(len(nums)):
            answer[i] = prefix
            prefix *= nums[i]

        # Multiply in the product of values after i.
        suffix = 1
        for i in range(len(nums) - 1, -1, -1):
            answer[i] *= suffix
            suffix *= nums[i]

        return answer
