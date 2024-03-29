class Solution:
    def climbStairs(self, n: int) -> int:
        ways = [1,2]
        for i in range(3, n+1):
            ways.append(ways[-2] + ways[-1])
        return ways[-1]