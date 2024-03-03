from typing import List
class Solution:
    def resultArray(self, nums: List[int]) -> List[int]:
        arr1 = []
        arr2 = []
        sort1 = []
        sort2 = []

        def greaterCount(arr, x):
          low = 0
          high = len(arr) - 1
          while low <= high:
              mid = low + (high - low) // 2
              if arr[mid] <= x:
                  low = mid + 1
              else:
                  high = mid - 1
          # Count elements from the found position to the end of the array
          return len(arr) - low
        def add_to_arr(arr, sort, value):
            greaterIndex = greaterCount(sort, value)
            sort.insert(len(arr)- greaterIndex, value)
            arr.append(value)
        
        add_to_arr(arr1, sort1, nums[0])
        add_to_arr(arr2, sort2, nums[1])
            
        for i in range(2, len(nums)):
            count_1 = greaterCount(sort1, nums[i])
            count_2 = greaterCount(sort2, nums[i])
            if(count_1 > count_2):
                add_to_arr(arr1, sort1, nums[i])
                continue
            if(count_2 > count_1):
                add_to_arr(arr2, sort2, nums[i])
                continue
            if(len(arr1) > len(arr2)):
                add_to_arr(arr2, sort2, nums[i])
                continue
            if(len(arr1) < len(arr2)):
                add_to_arr(arr1, sort1, nums[i])
                continue
            add_to_arr(arr1, sort1, nums[i])
            continue
        return arr1+ arr2
        


a = Solution()
print(a.resultArray([5,14,3,1,2]))