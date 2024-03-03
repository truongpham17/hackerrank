# https://leetcode.com/problems/climbing-stairs/
# EASY
class Solution:
    def climbStairs(self, n: int) -> int:
        if n == 1:
            return 1
        old = 1
        new = 2
        for _ in range(3, n+1):
            new = old + new
            old = new - old
        return new