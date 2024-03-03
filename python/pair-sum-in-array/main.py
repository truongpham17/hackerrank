class Solution:
    def minPairSum(self, nums: List[int]) -> int:
        nums = sorted(nums)
        max = 0
        for i in range(len(nums) // 2):
            if nums[i] + nums[len(nums) - 1 - i] > max:
                max = nums[i] + nums[len(nums) - 1 - i]
        return max