#MEDIUM
#https://leetcode.com/problems/house-robber/?envType=daily-question&envId=2024-01-21
class Solution:
    def rob(self, nums: List[int]) -> int:
        old = nums[0]
        new = old
        if len(nums) >= 2:
            new = max(nums[0], nums[1])

        for i in range(2, len(nums)):
            _new = max(new, old+nums[i])
            old = new
            new = _new 
        return new