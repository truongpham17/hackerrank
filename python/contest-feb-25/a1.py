class Solution:
    def isPossibleToSplit(self, nums: List[int]) -> bool:
        dic = {}
        for num in nums:
            if num in dic:
                dic[num]+=1
                if dic[num] > 2:
                    return False
            else:
                dic[num] = 1
        return True