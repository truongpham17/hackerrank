from collections import deque
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right


class Solution:
    def largestValues(self, root: Optional[TreeNode]) -> List[int]:
        result = []
        if root is None:
            return result
        cur_queue = deque([root])
        while len(cur_queue) > 0:
            cur_size = len(cur_queue)

            max = -float('inf')
            for _ in range(0, cur_size):
                node = cur_queue.popleft()
                if (node.val > max):
                    max = node.val
                if (node.left is not None):
                    cur_queue.append(node.left)
                if (node.right is not None):
                    cur_queue.append(node.right)
            result.append(max)
        return result
    a = 1.
    b = float(1)


print(isinstance(12, int))


a = 12
print(f"Your score is {a} %s" (a))
