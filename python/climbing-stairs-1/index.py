# https://leetcode.com/problems/climbing-stairs/
# EASY
class Solution:
    def climbStairs(self, n: int) -> int:
        ways = [1,2]
        for _ in range(3, n+1):
            ways.append(ways[-2] + ways[-1])
        return ways[n-1]