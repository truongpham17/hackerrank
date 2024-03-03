# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def leafSimilar(self, root1: Optional[TreeNode], root2: Optional[TreeNode]) -> bool:
        leaf_1 = []
        cur_index = 0
        value = True

        def reversalTree(node):
            nonlocal leaf_1
            if not node.left and not node.right:
              leaf_1.append(node.val)
            if node.left:
                reversalTree(node.left)
            if node.right:
                reversalTree(node.right)

        
        def reversalTree2(node):
          nonlocal cur_index
          nonlocal value 
          if not value:
             return
          
          if not node.left and not node.right:
            if cur_index >= len(leaf_1) or leaf_1[cur_index] != node.val:
              value = False
              return
            else:
              cur_index+=1
          if node.left:
            reversalTree2(node.left)
          if node.right:
            reversalTree2(node.right)
        
           
        reversalTree(root1)
        reversalTree2(root2)

        return value and cur_index == len(leaf_1)
            
            
