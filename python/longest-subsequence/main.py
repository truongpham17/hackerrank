class Solution:
    def longestCommonSubsequence(self, text1: str, text2: str) -> int:
        rs = []
        # max = 0
        for i in range(len(text1)):
            rs.append([])
            for j in range(len(text2)):
                if text1[i] == text2[j]:
                    if i > 0 and j > 0:
                      rs[-1].append(rs[i-1][j-1] + 1)
                    else:
                        rs[-1].append(1)
                else:
                    rs[-1].append()
                    a = 0
                    b = 0
                    if len(rs) > 1:
                        a = rs[-2][-1]
                    if len(rs[-1]) > 0:
                        b = rs[-1][-1]
                    rs[-1].append(max(a,b))
        print(rs)
        return rs[-1][-1]
ss = Solution()
print(ss.longestCommonSubsequence("ezupkr","ubmrapg"))