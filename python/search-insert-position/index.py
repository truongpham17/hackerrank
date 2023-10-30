class Solution:
    def searchInsert(self, nums: List[int], target: int) -> int:
        def binary_search(start, end):
            if (start > end):
                return start
            if(start < 0):
                return 0
            middle = round((start + end) / 2)
            if (nums[middle] == target):
                return middle
            elif (nums[middle] < target):
                return binary_search(middle + 1, end)
            else:
                if ((middle > 0 and nums[middle - 1] < target)):
                  return middle
                else:
                    return binary_search(start, middle - 1)
        return binary_search(0, len(nums) - 1)
    