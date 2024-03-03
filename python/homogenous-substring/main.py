MODULE = 10**9 + 7
class Solution:
    def countHomogenous(self, s: str) -> int:
        prev_char = s[0]
        result = 0
        duplicate_index = 1
        for i in range(1, len(s)):
            char = s[i]
            if char != prev_char:
                result = (result + duplicate_index * (duplicate_index + 1) // 2) % MODULE
                prev_char = char
                duplicate_index = 1
            else:
                duplicate_index += 1
        result = (result + duplicate_index * (duplicate_index + 1) // 2) % MODULE
        return result
    

solution = Solution()
print(solution.countHomogenous('oooorppppppppooooobbbjjjjcccccccccccceeeee'))
