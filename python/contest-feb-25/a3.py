class Solution:
    def earliestSecondToMarkIndices(self, nums: List[int], changeIndices: List[int]) -> int:
        mark = set()
        min_full_index = -1
        for i in range(len(changeIndices)):
            mark.add(changeIndices[i])
            if (len(mark) == len(nums)):
                min_full_index = i +1
                break
        if(min_full_index == -1):
            return -1
        total_decrease_step = sum(nums)
        decrease_end_full = min_full_index - len(nums)
        if decrease_end_full >= total_decrease_step:
            return min_full_index
        if total_decrease_step + len(nums) <= len(changeIndices):
            return total_decrease_step + len(nums)
        return -1