// https://leetcode.com/problems/find-common-characters/description/?envType=daily-question&envId=2024-06-10
// EASY
/**
 * @param {string[]} words
 * @return {string[]}
 */
var commonChars = function (words) {
  const arrMap = [];

  for (const word of words) {
    const map = new Map()
    if (set.has(char)) {
      if (map.has(char)) {
        map.set(char, map.get(char) + 1)
      } else {
        map.set(char, 1)
      }
    }
    arrMap.push(map)
  }

  const result = [];

  for (const char of arrMap[0].keys()) {
    const minRep = Math.min(...arrMap.map(i => i.get(char) || 0))
    for (let i = 0; i < minRep; i++) {
      result.push(char)
    }
  }
  return result
};
console.log(commonChars(["bella", "label", "roller"]))