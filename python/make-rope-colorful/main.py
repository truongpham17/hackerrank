# https://leetcode.com/problems/minimum-time-to-make-rope-colorful/
# MEDIUM

class Solution:
    def minCost(self, colors: str, neededTime: List[int]) -> int:
        min_cost = 0
        cur_index = 0
        n = len(colors)
        def findCostInRange(cur_index):
            i_min_cost = neededTime[cur_index]
            max_val = neededTime[cur_index]
            for i in range(cur_index + 1, n):
                if colors[i] == colors[cur_index]:
                  max_val = max(max_val, neededTime[i])
                  i_min_cost += i
                else:
                  return i_min_cost - max_val, i
            return i_min_cost - max_val, n
        while cur_index < n:
          cost, cur_index = findCostInRange(cur_index)
          min_cost += cost
        return min_cost