// https://leetcode.com/problems/minimum-time-difference/description/?envType=daily-question&envId=2024-09-16
// MEDIUM
/**
 * @param {string[]} timePoints
 * @return {number}
 */
var findMinDifference = function (timePoints) {
  const minutes = []
  for (const time of timePoints) {
    const minute = Number(time.substring(0, 2)) * 60 + Number(time.substring(3, 5))
    minutes.push(minute)
  }
  minutes.sort((a, b) => a - b)
  const diff = Math.abs(minutes[0] - minutes[minutes.length - 1])
  let min = Math.min(diff, 1440 - diff)
  for (let i = 1; i < minutes.length; i++) {
    const diff = minutes[i] - minutes[i - 1]
    min = Math.min(min, diff, 1440 - diff)
  }
  return min
};