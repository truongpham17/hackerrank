from collections import defaultdict
class Solution:
    def countPalindromicSubsequence(self, s: str) -> int:
        indexes = {}
        char_stacks = defaultdict(set)
        allow_same = set()
        for i in range(len(s)):
            if (s[i] in indexes):
                if(s[i] in allow_same):
                    char_stacks[s[i]].add(s[i])

                if (indexes[s[i]] + 1 < i):
                    for j in range(indexes[s[i]] + 1, i):
                        char_stacks[s[i]].add(s[j])
                    allow_same.add(s[i])
                    indexes[s[i]] = i
            else:
                indexes[s[i]] = i
        result = 0
        print(char_stacks['p'])
        for key in char_stacks:
            result += len(char_stacks[key])
        return result
                
solution = Solution()

print(solution.countPalindromicSubsequence("tlpjzdmtwderpkpmgoyrcxttiheassztncqvnfjeyxxp"))
