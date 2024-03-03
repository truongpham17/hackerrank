from typing import List
from collections import defaultdict
class Solution:
    def restoreArray(self, adjacentPairs: List[List[int]]) -> List[int]:
        
        vector = defaultdict(list)

        for [a,b] in adjacentPairs:
            vector[a].append(b)
            vector[b].append(a)

        head = None
        for key in vector.keys():
            if(len(vector[key]) == 1):
                head = key
                break
        
        result = []
        left = -1000000
        while True:
            result.append(head)
            if len(result) == len(adjacentPairs) + 1:
                break
            newval = vector[head][0] if vector[head][0] != left else vector[head][1]
            left = head
            head = newval

        return result
       
solution = Solution()
print(solution.restoreArray([[2,1],[3,4],[3,2]]))
