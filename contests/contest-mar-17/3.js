/**
 * @param {string} word
 * @param {number} k
 * @return {number}
 */
var minimumDeletions = function (word, k) {
  const charMap = new Map()
  for (c of word) {
    if (charMap.has(c)) {
      charMap.set(c, charMap.get(c) + 1)
    } else {
      charMap.set(c, 1)
    }
  }
  let  tempSort = []
  for (v of charMap.values()) {
    tempSort.push(v)

  }
   tempSort.sort((a,b) => a - b)
  const sum = [tempSort[0]]
  for (let i = 1; i < tempSort.length; i++) {
    sum.push(sum[sum.length - 1] + tempSort[i])
  }
  const db = new Array(sum.length)

  for (let i = 0; i < tempSort.length; i++) {
    db[i] = new Array(sum.length)
  }

  for (let i = 0; i < tempSort.length; i++) {
    db[0][i] = sum[i]
    db[i][i] = tempSort[i]
  }

  for (let i = 1; i < tempSort.length - 1; i++) {
    for (let j = i + 1; j < tempSort.length; j++) {
      db[i][j] = sum[j] - sum[i - 1]
    }
  }

  function findNext(pivot, curSlider) {
    for (let i = curSlider; i < tempSort.length; i++) {
      if (tempSort[i] - tempSort[pivot] > k) return i - 1
    }
    return tempSort.length - 1
  }
  let minRemove = 10 ** 8;
  let curSlider = 0;
  let curPivot = 0;
  while (curPivot < tempSort.length) {
    curSlider = findNext(curPivot, curSlider);
    const extra = (curSlider < sum.length - 1 ? db[curSlider + 1][sum.length - 1] - (tempSort[curPivot] + k) * (sum.length - curSlider - 1) : 0);
    const leftExtra = curPivot > 0 ? sum[curPivot - 1] : 0
    if (extra + leftExtra < minRemove) {
      minRemove = extra + leftExtra
    }
    curPivot++
    curSlider = Math.max(curPivot, curSlider)
  }
  return minRemove
};
console.log(minimumDeletions("rprrrrrrrrrp", 0))