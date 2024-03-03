class Solution:
    def maxLength(self, arr: List[str]) -> int:
        m_len = 0
        def findMaxLength(cur_str, index):
            nonlocal m_len
            if index >= len(arr):
                return
            string_contains = False
            m_set = set()
            for c in arr[index]:
                if c in cur_str or c in m_set:
                    string_contains = True
                    break
                m_set.add(c)
            if not string_contains:
                if len(cur_str) + len(arr[index]) > m_len:
                    m_len = len(cur_str) + len(arr[index])
                findMaxLength(cur_str + arr[index], index+1)
            findMaxLength(cur_str, index+1)
        findMaxLength("", 0)
        return m_len