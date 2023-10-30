class Solution:
    def kthGrammar(self, n: int, k: int) -> int:
        trace = 0 # 0 or 1
        while n > 1:
            if k % 2 == 0:
              trace = trace ^ 1
            k = (k + 1) // 2
            n -= 1
        return trace
    
# solution = Solution()
# solution.kthGrammar(3, 2)
def myFunc(n: list):
    print(n)
    
myFunc('12fsdfds')
