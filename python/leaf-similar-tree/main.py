# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def leafSimilar(self, root1: Optional[TreeNode], root2: Optional[TreeNode]) -> bool:
        def reversalTree(node, leaf: list):
            if not node.left and not node.right:
              leaf.append(node.val)
            if node.left:
                reversalTree(node.left, leaf)
            if node.right:
                reversalTree(node.right, leaf)
        leaf_1 = []
        leaf_2 = []
        reversalTree(root1, leaf_1)
        reversalTree(root2, leaf_2)
        if(len(leaf_1) != len(leaf_2)):
          return False
        
        for i in range(0, len(leaf_1)):
          if leaf_1[i] != leaf_2[i]:
            return False
        return True
            
            
