class Solution:
    def minOperations(self, nums: List[int], k: int) -> int:
        new_nums = sorted(nums)
        for i in range(len(nums)):
            if new_nums[i]>=k:
                return i
          
            