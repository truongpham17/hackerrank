class Solution:
    def isReachableAtTime(self, sx: int, sy: int, fx: int, fy: int, t: int) -> bool:
        diff = max(abs(fx - sx), abs(fy - sy))
        if diff != 0:
            return t - diff >= 0
        else:
            return t != 1