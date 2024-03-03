# MEDIUM
# https://leetcode.com/problems/maximum-difference-between-node-and-ancestor/
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
		max_stores = []
		def maxAncestorDiff(self, root: Optional[TreeNode]) -> int:
			def findMaxDiff(node):
				max_diff = 0
				min_val = node.val
				max_val = node.val
				if node.left:
					(l_max_diff, l_min, l_max) = findMaxDiff(node.left)
					max_diff = max(
						l_max_diff, 
						abs(node.val - l_max), 
						abs(node.val - l_min)
					)
					min_val = min(min_val, l_min)
					max_val = max(max_val, l_max)

				if node.right:
					(r_max_diff, r_min, r_max) = findMaxDiff(node.right)
					max_diff = max(
						max_diff,
						r_max_diff, 
						abs(node.val - r_max), 
						abs(node.val - r_min)
					)
					min_val = min(min_val, r_min)
					max_val = max(max_val, r_max)
					
				
				return (
					max_diff,
          min_val,
					max_val
        )
			(max_diff,min_v,max_v) = findMaxDiff(root)
			return max_diff