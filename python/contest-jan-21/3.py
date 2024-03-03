from collections import defaultdict
class Solution:
    def minimumPushes(self, word: str) -> int:
        dic = defaultdict(lambda:0)
        for c in word:
            dic[c]+=1
        ar = []
        result = 0
        for k in dic:
            ar.append(dic[k])
        ar.sort(reverse=True)
        for i in range(len(ar)):
            print(result)
            result += ar[i] * (i//8+1)
        return result
    
a = Solution()
print(a.minimumPushes("aabbccddeeffgghhiiiiii"))