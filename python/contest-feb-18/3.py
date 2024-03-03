from typing import List
class Solution:
    def mostFrequentPrime(self, mat: List[List[int]]) -> int:
        directions = [
            [0,1],
            [0,-1],
            [1,0],
            [-1,0],
            [1,1],
            [1,-1],
            [-1,1],
            [-1,-1]
        ]
        dic = dict()
        m = len(mat)
        n = len(mat[0])
        def is_prime(number):
            # Check if number is less than 2
            if number <= 10:
                return False
            # Check for factors from 2 to the square root of the number
            for i in range(2, int(number ** 0.5) + 1):
                if number % i == 0:
                    return False
            return True
        for i in range(m):
            for j in range(n):
                for dir in directions:
                    cur_number = ''
                    ii = i
                    jj = j
                    while ii < m and ii >= 0 and jj < n and jj >= 0:
                        cur_number += str(mat[ii][jj])
                        ii = ii + dir[0]
                        jj = jj + dir[1]
                        if cur_number in dic:
                            dic[cur_number]+=1
                        elif is_prime(int(cur_number)):
                            dic[cur_number] = 1
        max_arr = []
        max_rep = -1
        for key in dic:
            if dic[key] > max_rep:
                max_rep = dic[key]
                max_arr.clear()
                max_arr.append(int(key))
            elif dic[key] == max_rep:
                max_arr.append(int(key))
        if len(max_arr) > 0:
            return max(max_arr)
        return -1
                    
a = Solution()
print(a.mostFrequentPrime([[9,7,8],[4,6,5],[2,8,6]]))