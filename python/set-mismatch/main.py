class Solution:
    def findErrorNums(self, nums: List[int]) -> List[int]:
        nums.sort()
        nums.append(len(nums) + 1)
        result = [0,0]
        for i in range(1, len(nums)):
            if (nums[i] - nums[i-1]) == 0:
                result[0] = nums[i]
            elif nums[i] - nums[i-1]>1:
                result[1] = nums[i]-1
        return result