from typing import List
class Solution:
    def plusOne(self, digits: List[int]) -> List[int]:
        remember = 0
        for i in range(len(digits) - 1, -1, -1):
            if (digits[i] + 1 == 10):
                digits[i] = 0
                remember = 1
            else:
                digits[i] += 1
                remember = 0
                break
        if (remember == 0):
          return digits
        digits.insert(0, 1)
        return digits