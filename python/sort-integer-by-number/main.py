from typing import List


class Solution:
    def sortByBits(self, arr: List[int]) -> List[int]:
        def count_one_in_bits(number):
            string = bin(number)
            return string.count("1")

        arr = sorted(arr)
        arr = sorted(arr, key=count_one_in_bits)
        return arr


resolve = Solution()
resolve.sortByBits([1, 2, 3, 4, 5, 6])
