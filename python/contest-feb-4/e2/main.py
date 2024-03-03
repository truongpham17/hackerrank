class Solution:
    def minimumTimeToInitialState(self, word: str, k: int) -> int:
        n = len(word)
        mod = n % k
        r=0
        for i in range((n-mod)//k-1,-1,-1):
            r+=1
            l = mod + i * k
            if word[0:l:1] == word[n -l:n:1]:
                return r 
        if mod == 0:
            return n // k
        return n // k + 1
                
a = Solution()
print(a.minimumTimeToInitialState("abacaba", 3))
