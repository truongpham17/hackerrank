from collections import defaultdict
class Solution:
    def firstUniqChar(self, s: str) -> int:
        ar = defaultdict(lambda: 0)
        result = ''
        for c in s:
            ar[c] = ar[c] + 1
        for i in range(len(s)):
            if ar[s[i]] == 1:
                return i
        return -1
                
