import math
from typing import List

class Solution:
    def eliminateMaximum(self, dist: List[int], speed: List[int]) -> int:
        for i in range(len(dist)):
            dist[i] = math.ceil(dist[i] / speed[i])
        dist = sorted(dist)
        count = 0
        while(count < len(dist)):
            if (dist[count] <= count):
                break
            else:
                count += 1
        return count
    

solution = Solution()
print(solution.eliminateMaximum([4,3,4], [1,1,2]))