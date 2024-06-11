/**
 * @param {number[]} rewardValues
 * @return {number}
 */
var maxTotalReward = function (rewardValues) {
  // store [i,j]
  const parts = []
  const cleanUp = () => {
    // make sure part is sorted
    const n = parts.length;
    for (let i = 0; i < n - 2; i++) {
      if (parts[i][1] + 1 >= parts[i + 1][0]) {
        parts[i][1] = parts[i + 1][0];
        parts.splice(i + 1, 1);
        return cleanUp()
      }
    }
  }

  const sortedReward = rewardValues.sort((a, b) => a - b);
  const n = rewardValues.length;

  const findLesserChunks = (k) => {
    const result = []
    for (const [start, end] of parts) {
      if (start < k) {
        if (end < k) {
          result.push([start, end])
        } else {
          result.push([start, k - 1])
          return result
        }
      } else {
        return result
      }
    }
    return result
  }

  parts.push([1, 1])

  for (let i = 0; i < n; i++) {
    const chunks = findLesserChunks(sortedReward[i]);
    for (const [start, end] of chunks) {
      parts.push([sortedReward[i] + start, sortedReward[i] + end])
      cleanUp();
      parts.sort((a, b) => a[0] - b[0])
      console.log("🚀 ~ maxTotalReward ~ parts:", parts)
    }
  }
  return parts[parts.length - 1][1]
};
console.log(maxTotalReward([1, 6, 4, 3, 2]))

const array = [];
for (let i = 0; i < 50000; i++) {
  array.push(Math.round(Math.random() * 50000))
}
console.log(maxTotalReward(array))
