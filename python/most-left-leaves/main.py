# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def findBottomLeftValue(self, root: Optional[TreeNode]) -> int:
        max_depth = -1
        result =  root.val
        def traversal(node, depth):
            nonlocal max_depth
            nonlocal result
            if node.left:
                if depth > max_depth:
                    result = node.left.val
                    max_depth = depth
                traversal(node.left, depth+1)
            if node.right:
                if depth > max_depth:
                    result = node.right.val
                    max_depth = depth
                traversal(node.right, depth+1)
        traversal(root, 0)
        return result
        
      