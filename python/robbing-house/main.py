#MEDIUM
#https://leetcode.com/problems/house-robber/?envType=daily-question&envId=2024-01-21
class Solution:
    def rob(self, nums: List[int]) -> int:
        ar = [nums[0]]
        if len(nums) >= 2:
            ar.append(max(nums[0], nums[1]))
        for i in range(2, len(nums)):
            ar.append(max(ar[-1], ar[-2] + nums[i]))
        return ar[-1]