# Algorithm: Manacher's Algorithm
class Solution:
    def longestPalindrome(self, s: str) -> str:
        def findLength(index: str) -> str:
            l = 1
            i = 1
            _str = s[index]
            while (index - i >= 0 and index + i < len(s)):
                if s[index - i] == s[index + i]:
                    l += 1
                    _str = s[index - i] + _str + s[index + i]
                    i += 1
                else:
                    break
            return _str

        def findLengthDouble(index: str) -> str:
            i = 1
            _str = s[index]
            if (index < len(s) - 1 and s[index] == s[index + 1]):
                _str = _str + s[index + 1]
            else:
                return ''
            while (index - i >= 0 and index + 1 + i < len(s)):
                if (s[index - i] == s[index + 1 + i]):
                    _str = s[index - i] + _str + s[index + 1 + i]
                    i += 1
                else:
                    break

            return _str

        _max = ''
        for i in range(len(s)):
            f_1 = findLength(i)
            if len(f_1) > len(_max):
                _max = f_1
            f_2 = findLengthDouble(i)
            if len(f_2) > len(_max):
                _max = f_2
        return _max


solution = Solution()
print(solution.longestPalindrome('babad'))
