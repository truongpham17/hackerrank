from typing import List
class Solution:
    def countPrefixSuffixPairs(self, words: List[str]) -> int:
          def common_suffix_prefix(string):
              n = len(string)
              common = ""
              if len(string) == 1:
                  return string
              for i in range(1, n):
                  if string[:i] == string[n-i:]:
                      common = string[:i]
              return common
          
          
          result = 0
          def longestPrefix_2(arr1, arr2, indexes1, indexes2, cur_prefix):
            print(arr1, arr2)
            nonlocal result
            for char in range(ord('a'), ord('z')+1):
                new_prefix = cur_prefix + chr(char)
                new_arr_1 = []
                new_arr_2 = []
                new_id_1 = []
                new_id_2 = []
                
                for i in range(len(arr2)):
                    a = arr2[i]
                    if len(a) >= len(new_prefix) and a[len(new_prefix) - 1] == chr(char):
                        new_arr_2.append(a)
                        new_id_2.append(indexes2[i])

                for i in range(len(arr1)):
                    a = arr1[i]
                    if len(a) >= len(new_prefix) and a[len(new_prefix) - 1] == chr(char):
                        new_arr_1.append(a)
                        new_id_1.append(indexes1[i])
                        if len(a) == len(new_prefix):
                            for index in new_id_2:
                                if index > indexes1[i]:
                                    result += 1

                if len(new_arr_1) > 0 and len(new_arr_2) > 0:
                    longestPrefix_2(new_arr_1, new_arr_2, new_id_1, new_id_2, new_prefix)
          indexes_1 = []
          indexes_2 = []
          for i in range(len(words)):
              indexes_1.append(i)
          common_str = []
          for i in range(len(words)):
              s = common_suffix_prefix(words[i])
              if len(s) > 0:
                common_str.append(s)
                indexes_2.append(i)
          longestPrefix_2(words, common_str, indexes_1, indexes_2, '')  
          return result
        

            
a = Solution()
print(a.countPrefixSuffixPairs( ["cbbca","ac","ac"]))