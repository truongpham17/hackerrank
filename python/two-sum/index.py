class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        my_set = {}
        for idx, num in enumerate(nums):
            if ((target - num) in my_set):
                return [my_set[target - num], idx]
            my_set[num] = idx