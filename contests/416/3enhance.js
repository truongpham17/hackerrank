/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var validSubstringCount = function (word1, word2) {
  if (word1.length < word2.length) return 0
  const charToNumber = c => (c.charCodeAt(0) - 97)
  const dp = Array.from({ length: 30 }, () => [])

  for (let i = 0; i < word1.length; i++) {
    dp[charToNumber(word1[i])].push(i)
  }

  let target = []
  for (const c of word2) {
    if (target[charToNumber(c)]) {
      target[charToNumber(c)]++
    } else {
      target[charToNumber(c)] = 1
    }
  }
  const save = [...target]


  function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    let result = -1;

    while (left <= right) {
      let mid = Math.floor((left + right) / 2);

      if (arr[mid] >= target) {
        result = arr[mid]; // Possible answer, but keep searching on the left
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }

    return result;
  }
  let count = word2.length;
  let i = 0
  const current = {}

  while (count > 0 && i < word1.length) {
    if (target[charToNumber(word1[i])] > 0) {
      target[charToNumber(word1[i])]--
      count--
    }
    if (current[charToNumber(word1[i])]) {
      current[charToNumber(word1[i])]++

    } else {
      current[charToNumber(word1[i])] = 1
    }

    i++
  }
  target = save

  if (count !== 0) return -1

  let leftWindow = i - 1
  if (leftWindow === -1) return 0
  let rs = word1.length - leftWindow

  for (let i = 1; i < word1.length; i++) {
    current[charToNumber(word1[i - 1])]--
    if (target[charToNumber(word1[i - 1])] > 0 && current[charToNumber(word1[i - 1])] < target[charToNumber(word1[i - 1])]) {
      leftWindow = binarySearch(dp[charToNumber(word1[i - 1])], leftWindow)
      if (leftWindow !== -1) {
        current[charToNumber(word1[i - 1])]++
      }
    }
    rs += word1.length - leftWindow
  }
  return rs
};
console.log(validSubstringCount("dddddededddeeeddd", "eee"))