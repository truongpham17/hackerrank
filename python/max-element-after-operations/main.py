from typing import List

class Solution:
    def maximumElementAfterDecrementingAndRearranging(self, arr: List[int]) -> int:
        arr = sorted(arr)
        arr[0] = 1
        max_value = 1
        for i in arr:
            if i > max_value:
                max_value += 1
        return max_value
        