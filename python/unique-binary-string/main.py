from typing import List

class Solution:
    def findDifferentBinaryString(self, nums: List[str]) -> str:
        result = None
        for i in range(len(nums)):
            nums[i] = int(nums[i], 2)
        nums = sorted(nums)
        print(nums)
        if (nums[0] != 0):
            return '0'.zfill(len(nums))
        
        for i in range(len(nums) - 1):
            if nums[i + 1] > nums[i] + 1:
                result = nums[i] + 1
                break
        if(not result):
            result = nums[-1] + 1
        
        return format(result, 'b').zfill(len(nums))
    

solution = Solution()
print(solution.findDifferentBinaryString(['1']))