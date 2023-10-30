from typing import List

MOD_VALUE = 10**9 + 7
class Solution:
    def numFactoredBinaryTrees(self, arr: List[int]) -> int:
        arr.sort()
        print(arr)
        my_set = set(arr)
        map = {x: 1 for x in arr}
        for i in arr:
            for j in arr:
                if j > i ** 0.5:
                    break
                if (i % j == 0 and i // j in my_set):
                    if j == i // j:
                        map[i] += map[j] ** 2
                    else:
                        map[i] += map[j] * map[i // j] * 2
        m_sum = sum(map.values())         
        return m_sum    
    a = "fsdfas f saf asdfs"
    print(a["city"])
    
func = Solution()
print(func.numFactoredBinaryTrees([2,3,5,7,6,35,210]))
# expected: 777
# [2,3,6,18,36]
# actual: 32
# expected: 36
# 