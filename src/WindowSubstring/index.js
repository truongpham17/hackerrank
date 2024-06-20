// https://leetcode.com/problems/minimum-window-substring/?envType=daily-question&envId=2024-06-13
// HARD
/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function (s, t) {
  const map = new Map();
  const dMap = new Map();

  for (const char of t) {
    if (map.has(char)) {
      map.set(char, map.get(char) + 1)
    } else {
      map.set(char, 1)
    }
  }

  let start = 0;
  let end = -1;

  let matchCount = 0;

  for (let index = 0; index < s.length; index++) {
    const char = s[index]
    if (map.has(char)) {
      if (dMap.has(char)) {
        dMap.set(char, dMap.get(char) + 1);
        if (dMap.get(char) <= map.get(char)) {
          matchCount++;
        }
      } else {
        dMap.set(char, 1)
        matchCount++
      }
      if (matchCount === t.length) {
        end = index;
        break;
      }
    }
  }

  if (end === -1) {
    return ''
  }

  const result = {
    start: 0,
    end
  }

  function increaseLeft(curStart) {
    if (curStart >= s.length) return -1
    const char = s[curStart];
    if (map.has(char)) {
      if (dMap.has(char)) {
        if (dMap.get(char) === map.get(char)) {
          return curStart;
        } else {
          dMap.set(char, dMap.get(char) - 1)
        }
      } else {
        return -1;
      }
    }
    return increaseLeft(curStart + 1);
  }
  function increaseRight(curEnd, missingChar) {
    for (let i = curEnd + 1; i < s.length; i++) {
      if (map.has(s[i])) {
        dMap.set(s[i], dMap.get(s[i]) + 1)
      }
      if (s[i] === missingChar) {
        return i
      }
    }
    return -1
  }
  while (start < s.length && end < s.length) {
    start = increaseLeft(start);
    if (start === -1) return s.slice(result.start, result.end + 1);
    const nextLength = end - start + 1;
    if (nextLength < result.end - result.start + 1) {
      result.start = start;
      result.end = end
    }

    end = increaseRight(end, s[start]);
    if (end === -1) {
      return s.slice(result.start, result.end + 1)
    }
    dMap.set(s[start], dMap.get(s[start]) - 1)
    start = start + 1;
  }
  return s.slice(result.start, result.end + 1)
};
// A D O B E C O D E B A N C
// 0 1 2 3 4 5 6 7 8 9 10 11 12