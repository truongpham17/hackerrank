class Solution:
    def returnToBoundaryCount(self, nums: List[int]) -> int:
        result = 0
        temp = 0
        for val in nums:
            temp += val
            if temp == 0:
                result += 1
        return result