# https://leetcode.com/problems/convert-an-array-into-a-2d-array-with-conditions/
# MEDIUM
from typing import List
from collections import defaultdict

def def_value():
    return 0

class Solution:
    def findMatrix(self, nums: List[int]) -> List[List[int]]:
        m_set = defaultdict(def_value)
        result = []
        for i in nums:
            m_set[i] = m_set[i] + 1
        def getTreeAndUpdateSet():
            result.append([])
            for i in list(m_set):
                if(m_set[i] > 0):
                  m_set[i]-=1
                  result[-1].append(i)
                if(m_set[i] == 0):
                    m_set.pop(i)

        while(len(m_set) > 0):
            getTreeAndUpdateSet()
     
        return result
                    

solution = Solution()
print(solution.findMatrix( [1,3,4,1,2,3,1]))