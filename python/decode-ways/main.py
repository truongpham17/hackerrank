# https://leetcode.com/problems/decode-ways/
# MEDIUM

class Solution:
    def numDecodings(self, s: str) -> int:
      _1 = 0
      _2 = 0
      _3 = 0
      if s[0] == '0':
         return 0
      else:
         _1 = 1
      if(len(s) == 1):
        return 1
      
      if s[1] != '0':
        _2 = 2
      else:
        _2 = 1
        
      if int(s[0:2]) > 26:
        _2 = 1
      if int(s[0:2]) > 26 and s[1] == '0': 
        return 0
      _3 = _2

      for i in range(2, len(s)):
        _3 = 0
        if s[i] != '0':
          _3 += _2
        if int(s[i - 1:i + 1]) <= 26 and int(s[i - 1:i + 1]) > 9:
          _3 += _1
        if _3 == 0:
          return 0
        _1 = _2
        _2 = _3
      return _3
      
                  
'''
do something here
list a[]
a[0] = 1, if a[0] != 0
a[1] = (a[0] | 0)
a[2] = (a[1] if a[2] != 0 | 0) + (a[0] if 9 < a[1]a[2] <= 26 | 0)

'''