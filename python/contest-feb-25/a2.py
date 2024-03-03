from typing import List
class Solution:
    def largestSquareArea(self, bottomLeft: List[List[int]], topRight: List[List[int]]) -> int:
        def findMaxIntersectionArea(rect1, rect2):
            x1 = max(rect1[0], rect2[0])
            y1 = max(rect1[1], rect2[1])
            x2 = min(rect1[2], rect2[2])
            y2 = min(rect1[3], rect2[3])

            width = max(0, x2 - x1)
            height = max(0, y2 - y1)
            min_side = min(width, height)
            return min_side ** 2


        
        min_area = 0
        n = len(bottomLeft)
        for i in range(n):
          for j in range(i + 1, n):
            new_area = findMaxIntersectionArea([
              bottomLeft[i][0],
               bottomLeft[i][1],
               topRight[i][0],
               topRight[i][1],
            ],
            [
              bottomLeft[j][0],
                bottomLeft[j][1],
               topRight[j][0],
               topRight[j][1],
            ]
            )
            min_area = max(min_area, new_area)
        return min_area
             
                
a = Solution()
print(a.largestSquareArea(
[[1,1],[3,3],[3,1]],
[[2,2],[4,4],[4,2]]))