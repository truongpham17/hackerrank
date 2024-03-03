# https://leetcode.com/problems/number-of-dice-rolls-with-target-sum/
# MEDIUM
class Solution:
    def numRollsToTarget(self, n: int, k: int, target: int) -> int:
        MODULO = 10**9 + 7

        if (target > k * n) or (target < n):
            return 0
        
        if (n == 1):
            return 1
        
        prev = {}
        cur = {}

        for i in range(1, k + 1):
            prev[i] = 1

          
        for _n in range(2,n + 1):
            for _k in range(_n,k*_n + 1):
                cur[_k] = 0
                for _k_prev in range(1,k + 1):
                    if (_k-_k_prev >= _n-1) and (_k-_k_prev <= (_n-1)*k):
                        cur[_k] += prev[_k-_k_prev]
                    cur[_k] %= MODULO
                if _k > target:
                    break
                
            prev = dict(cur)
            cur = {}

        return prev[target] % MODULO


print(Solution().numRollsToTarget(30,30,500))