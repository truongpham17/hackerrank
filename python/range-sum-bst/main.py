# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
  def rangeSumBST(self, root, low: int, high: int) -> int:
    result = 0
    def searchAndSum(node):
      nonlocal result
      if node.val is None:
        return 
      if node.val <= high and node.val >= low:
        result += node.val
      if node.val >= low:
        searchAndSum(node.left)
      if node.val <= high:
        searchAndSum(node.right)
    searchAndSum(root)
    return result
  
solution = Solution()
print(solution.rangeSumBST([1,2,3]))
