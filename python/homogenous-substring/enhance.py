MODULE = 10**9 + 7
class Solution:
    def countHomogenous(self, s: str) -> int:
        dic = {}
        prev_char = '_'
        result = 0
        duplicate_index = 0
        for char in s:
            if char != prev_char[0]:
                
                if not char in dic:
                    dic[char] = { 1 : 1 }
                else:
                    dic[char][1] = dic[char][1] + 1 
                prev_char = char
            else:
                prev_char += char
                new_index = len(prev_char)
                if new_index in dic[char]:
                    dic[char][new_index] += 1
                else:
                    dic[char][new_index] = 1
        result = 0
        for key in dic:
            substring = dic[key]
            key_count = len(substring)
            internal_count = substring[key_count]
            prev_count = substring[key_count]
            for i in range(key_count - 1, 0, -1):
                internal_count += prev_count + substring[i]
                prev_count = prev_count + substring[i]

            result = (result + internal_count) % MODULE
        return result
            
solution = Solution()
print(solution.countHomogenous('oooorppppppppooooobbbjjjjcccccccccccceeeee'))
