"""Top K Frequent Elements.

Given nums and k, return the k numbers that appear most often.

Example: nums = [1, 1, 1, 2, 2, 3], k = 2
1 appears 3 times, 2 appears 2 times, and 3 appears 1 time.
answer = [1, 2]

n = total number of values in nums.
u = number of unique values in nums.

How to test:
Test file: tests/python/test_top_k_frequent_elements.py
Run: PYTHONDONTWRITEBYTECODE=1 python3 -m unittest -v tests/python/test_top_k_frequent_elements.py
"""


def top_k_frequent_sorted(nums: list[int], k: int) -> list[int]:
    """First solution: count values, then sort by frequency.

    Time: O(n + u log u)
    - Counting every number takes O(n).
    - Sorting u unique number/frequency pairs takes O(u log u).

    Space: O(u), for the dictionary and sorted list of pairs.
    """
    num_map = {}

    for num in nums:
        num_map[num] = num_map.get(num, 0) + 1

    # Each item is (number, frequency). item[1] is the frequency.
    sorted_items = sorted(
        num_map.items(), key=lambda item: item[1], reverse=True
    )

    answers = []

    for num, frequency in sorted_items:
        if len(answers) == k:
            break

        # Return the number itself, not its frequency.
        answers.append(num)

    return answers


class Solution:
    def topKFrequent(self, nums: list[int], k: int) -> list[int]:
        """Optimized solution: use a bucket for each possible frequency.

        buckets[frequency] contains numbers that appeared that many times.
        We collect numbers from the highest frequency bucket downward.

        Time: O(n): count, fill buckets, and inspect at most n buckets.
        Space: O(n): the dictionary and buckets can together hold up to n values.
        """
        num_map = {}

        # Step 1: count each number.
        for num in nums:
            num_map[num] = num_map.get(num, 0) + 1

        # Step 2: index = frequency; value = list of numbers with it.
        # Do not use [[]] * (len(nums) + 1): it would repeat the same list.
        buckets = [[] for _ in range(len(nums) + 1)]

        for num, frequency in num_map.items():
            buckets[frequency].append(num)

        # Step 3: start at the largest possible frequency.
        answers = []

        for frequency in range(len(nums), 0, -1):
            for num in buckets[frequency]:
                answers.append(num)

                if len(answers) == k:
                    return answers

        return answers
