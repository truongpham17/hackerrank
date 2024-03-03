# from collections import List

class Solution:
    def minFallingPathSum(self, matrix: List[List[int]]) -> int:
        dp = [[]]
        n = len(matrix)
        if n == 1:
            return matrix[0][0]
        
        for i in range(n):
            dp[0].append(matrix[0][i])
        
        for i in range(1, n):
            dp.append([])
            dp[-1].append(matrix[i][0] + min(dp[i-1][0], dp[i-1][1]))
        
            for j in range(1, n-1):
                dp[-1].append(matrix[i][j] + min(dp[i-1][j], dp[i-1][j-1], dp[i-1][j+1]))

            dp[-1].append(matrix[i][n-1] + min(dp[i-1][n-1], dp[i-1][n-2]))

        return min(dp[-1])