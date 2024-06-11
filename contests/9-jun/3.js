/**
 * @param {number[]} rewardValues
 * @return {number}
 */
var maxTotalReward = function (rewardValues) {
  const dict = new Set();
  const sortedRewards = rewardValues.sort((a, b) => a - b)
  const n = rewardValues.length

  function binarySearch(k) {
    let low = 0;
    let high = sortedRewards.length - 1;
    let result = -1;

    while (low <= high) {
      let mid = Math.floor((low + high) / 2);

      if (sortedRewards[mid] > k) {
        result = mid;
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    }

    return result;
  }

  const findValue = (k) => {
    if (dict.has(k)) {
      return
    }
    dict.add(k)
    const index = binarySearch(k);
    if (index !== -1) {
      // from index to length - 1
      for (let i = index; i < n; i++) {
        findValue(k + sortedRewards[i])
      }
    }
  }
  for (let i = 0; i < n; i++) {
    findValue(rewardValues[i])
  }


  const keys = Array.from(dict);
  return Math.max(...keys)
};


const array = [];
for (let i = 0; i < 50000; i++) {
  array.push(Math.round(Math.random() * 50000))
}
console.log(maxTotalReward(array))
