from typing import List
# https://leetcode.com/problems/minimum-difficulty-of-a-job-schedule/
# HARD
# 1 <= jobDifficulty.length <= 300
# 0 <= jobDifficulty[i] <= 1000
# 1 <= d <= 10
# Final solution
# j+1 day get last k jobs, k >= 1, i - k >= j - 1 => k <= i - j + 1
# dp[i][j] = dp[i-k][j-1] + max(jobDifficulty[i-k+1:i+1]), k = 1 to i - j - 1
# how to calculate dp[i+1][j]?
# dp[i+1][j] = dp[i-k][j-1] + max(jobDifficulty[i+1-k:i+2]) k = 0 to i - j + 1
MAX_NUMBER = 1_000_000_000_000

class Solution:
    def minDifficulty(self, jobDifficulty: List[int], d: int) -> int:
        if len(jobDifficulty) < d:
            return -1
        
        if len(jobDifficulty) == d:
            return sum(jobDifficulty)
        
        if d == 1:
            return max(jobDifficulty)
        
        dp = {}
        max_cache = 0
        internal_max_cache = jobDifficulty[i]
        
        for i in range(0, len(jobDifficulty)):
            if jobDifficulty[i] > max_cache:
                max_cache = jobDifficulty[i]
            dp[i] = {0: max_cache}

            for j in range(1,min(i+1, d)):
                dp[i][j] = MAX_NUMBER
            
                for k in range(1,i-j+2):
                    if internal_max_cache < jobDifficulty[i-k+1]:
                        internal_max_cache = jobDifficulty[i-k+1]
                    dp[i][j] = min(dp[i][j], dp[i-k][j-1] + internal_max_cache)
        
        return dp[len(jobDifficulty)-1][d-1]

solution = Solution()
print(solution.minDifficulty([6,5,4,3,2,1],2))

    

       