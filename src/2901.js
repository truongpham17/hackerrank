/**
 * @param {string[]} words
 * @param {number[]} groups
 * @return {string[]}
 */
var getWordsInLongestSubsequence = function (words, groups) {
  const isOneDiff = (a, b) => {
    let findDiff = false;
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        if (!findDiff) {
          findDiff = true
        } else {
          return false
        }
      }
    }
    return findDiff
  }
  const arr = new Array(words.length).fill(1)
  const trace = new Array(words.length).fill(null)
  for (let i = 0; i < groups.length; i++) {
    for (let j = i + 1; j < groups.length; j++) {
      if (words[i].length === words[j].length && groups[i] !== groups[j] && isOneDiff(words[i], words[j])) {
        if (arr[i] + 1 > arr[j]) {
          arr[j] = arr[i] + 1
          trace[j] = i
        }
      }
    }
  }
  let maxIndex = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > arr[maxIndex]) {
      maxIndex = i
    }
  }

  const rs = [maxIndex]
  while (trace[maxIndex] !== null) {
    rs.push(trace[maxIndex])
    maxIndex = trace[maxIndex]
  }
  rs.reverse()
  return rs.map(x => words[x])
};

console.log(getWordsInLongestSubsequence(["cb", "dcc", "da", "cbb", "bd", "dbc", "ab", "db"], [4, 5, 5, 7, 8, 1, 3, 4]))