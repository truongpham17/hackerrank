from collections import defaultdict
class Solution:
    def uniqueOccurrences(self, arr: List[int]) -> bool:
        m_dict = defaultdict(lambda: 0)
        for val in arr:
            m_dict[val] += 1
        m_set = set()
        for key in m_dict:
            if m_dict[key] in m_set:
                return False
            m_set.add(m_dict[key])
        return True