from typing import List
class Solution:
    def countPrefixSuffixPairs(self, words: List[str]) -> int:
        result = 0
        for i in range(len(words)):
            for j in range(i+1,len(words)):
                partial = words[i]
                original = words[j]
                print(original[len(original) - len(partial):len(original)])
                if (original[0:len(partial)] == partial) and (original[len(original) - len(partial):len(original)] == partial):
                    result+=1
        return result

            
a = Solution()
a.countPrefixSuffixPairs(["pa","papa","ma","mama"])