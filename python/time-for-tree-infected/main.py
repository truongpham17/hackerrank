# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def amountOfTime(self, root, start: int) -> int:
        new_root = None
        def findNewRoot(cur_node, parent_node):
            nonlocal new_root
            if new_root:
                return
            if not cur_node:
                return
            if cur_node.val == start:
                new_root = cur_node
                new_root.middle = parent_node
                if parent_node and parent_node.left and parent_node.left.val == start:
                    parent_node.left = None
                if parent_node and parent_node.right and parent_node.right.val == start:
                    parent_node.right = None

            findNewRoot(cur_node.left, cur_node)
            findNewRoot(cur_node.right, cur_node)

        findNewRoot(root, None)
        
        if not new_root:
            return 0
        
        def findLength(node):
            if not node:
                return 0
            return 1 + max(findLength(node.left), findLength(node.right))
        
        return max(findLength(new_root.left), findLength(new_root.middle), findLength(new_root.right))
    
        
        