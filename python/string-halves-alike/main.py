class Solution:
    def halvesAreAlike(self, s: str) -> bool:
        VOWELS = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']
        self.count = 0
        middle = len(s)/2 - 1
        for i in range(0, len(s)):
            if s[i] in VOWELS:
                if i <= middle:
                    self.count += 1
                else:
                    self.count -= 1
        return self.count == 0