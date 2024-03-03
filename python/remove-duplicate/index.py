import random
from typing import List

class Solution:
    
    def removeDuplicates(self, nums: List[int]) -> int:
        pivot = 1
        for idx in range(1, len(nums)):
            if (nums[idx] != nums[idx - 1]):
                nums[pivot] = nums[idx]
                pivot += 1
        return pivot
print(random.random())


