from typing import List
class Solution:
    def longestCommonPrefix(self, arr1: List[int], arr2: List[int]) -> int:
        max_prefix = 0
        # array of string
        def longestPrefix_2(arr1, arr2, cur_prefix):
            nonlocal max_prefix
            max_prefix = max(max_prefix, len(cur_prefix))
            for i in range(10):
                new_prefix = cur_prefix + str(i)
                new_arr_1 = []
                new_arr_2 = []
                for a in arr1:
                    if len(a) >= len(new_prefix) and a[len(new_prefix) - 1] == str(i):
                        new_arr_1.append(a)
                for a in arr2:
                    if len(a) >= len(new_prefix) and a[len(new_prefix) - 1] == str(i):
                        new_arr_2.append(a)
                if len(new_arr_1) > 0 and len(new_arr_2) > 0:
                    longestPrefix_2(new_arr_1, new_arr_2, new_prefix)
        arr1_str = []
        arr2_str = []
        for num in arr1:
            arr1_str.append(str(num))
        for num in arr2:
            arr2_str.append(str(num))
        longestPrefix_2(arr1_str, arr2_str, '')
        return max_prefix
a = Solution()
print(a.longestCommonPrefix([13444,14222,13555],[13422,14555,14333]))