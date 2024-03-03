class Solution:
    def pseudoPalindromicPaths (self, root: Optional[TreeNode]) -> int:
        count = 0

        def travel(val, node):
            nonlocal count
            val ^= 1<<node.val
            if node.left or node.right:
                if node.left:
                    travel(val, node.left)
                if node.right:
                    travel(val, node.right)
            else:
                if bin(val).count('1') <= 1:
                    count+=1
        travel(0, root)
        return count
