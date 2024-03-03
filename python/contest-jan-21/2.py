class Solution:
    def countOfPairs(self, n: int, x: int, y: int):
        ar = []
        for _ in range(n+1):
            ar.append(0)
        def cal(x,y):
            nonlocal ar
            for i in range(1, y-x+1):
                ar[i]+=y-x+1-i
        if x > y:
            (x,y)=(y,x)
        #inner circle 
        cal(x+1,y-1)
        #outer circle
        cal(1,n-(y-x))
        print(ar)

a = Solution()
a.countOfPairs(4,1,4)