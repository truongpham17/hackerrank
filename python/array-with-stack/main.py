from typing import List

class Solution:
    def buildArray(self, target: List[int], n: int) -> List[str]:
        result = []

        for i in range(target[0] - 1):
            result.append('Push')
            result.append('Pop')
        result.append('Push')

        for i in range(1, len(target)):
            for i in range(target[i] - target[i - 1] - 1):
                result.append('Push')
                result.append('Pop')
            result.append('Push')

        return result
    
solution = Solution()
print(solution.buildArray([2,3,4,5,8,9,10], 10))