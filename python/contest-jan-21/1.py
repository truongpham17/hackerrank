class Solution:
    def minimumPushes(self, word: str) -> int:
        ar = []
        dic = {}
        for _ in range(8):
            ar.append(0)
        _sum = 0
        for c in word:
            if not c in dic:
                min_k = 0
                for i in range(8):
                    if ar[i] < ar[min_k]:
                        min_k = i
                ar[min_k]+=1
                _sum+=ar[min_k]
                dic[c] = ar[min_k]
            else:
                _sum+=dic[c]
                print(c,dic[c])
        return _sum
solution = Solution()
print(solution.minimumPushes("aabbccddeeffgghhiiiiii"))