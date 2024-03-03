from collections import defaultdict


VOWELS = ['A','E','I','O','U','a','e','i','o','u']

class Solution:
    def sortVowels(self, s: str) -> str:
        bucket = {}
        
        for char in s:
            if char in VOWELS:
                if(char in bucket):
                    bucket[char] += 1
                else:
                    bucket[char] = 1

        sortedVowel = ''

        for i in range(len(VOWELS)):
            if VOWELS[i] in bucket:
                sortedVowel += VOWELS[i] * bucket[VOWELS[i]]
        
        vowelIndex = 0
        result = ''

        for i in range(len(s)):
            if(s[i] in bucket):
                result += sortedVowel[vowelIndex]
                vowelIndex += 1
            else:
                result += s[i]
        return result
    
solution = Solution()
print(solution.sortVowels("lEetcOde"))