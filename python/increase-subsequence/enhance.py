#MEDIUM

from typing import List

class Solution:
    def lengthOfLIS(self, nums: List[int]) -> int:
      s = []
      for i in range(len(nums)):
        s.append(0)
        for j in range(0, i):
          if (nums[j] < nums[i] and s[j] > s[i]):
            s[i] = s[j]
        s[i] += 1
      return max(s)
          
'''
solution:
s[i] = max s[j] + 1; nums[j] < nums[i]; j: 0 to i - 1
bigO = n*n
nlogn -> it is binary search
find max j within log(n)
store max
get max: from -min to nums[i], it take log(n)?, no it take log 10**4
find j: j < i?
a,b,c,d: num[b] <= num[a], num[c] >= num[d], then  s[i] = s[c]
from 0 to i - 1

'''