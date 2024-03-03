from typing import List
import heapq
class Solution:
    def minOperations(self, nums: List[int], k: int) -> int:
        def create_min_heap(arr):
            min_heap = []
            for num in arr:
                heapq.heappush(min_heap, num)
            return min_heap
        min_heap = create_min_heap(nums)
        result = 0
        while True:
            a = heapq.heappop(min_heap)
            if(a >= k):
                return result
            b = heapq.heappop(min_heap)
            result+=1
            heapq.heappush(min_heap, min(a,b) * 2 + max(a,b))

a = Solution()
print(a.minOperations([1,1,2,4,9],20))