// https://leetcode.com/problems/count-number-of-teams/
// MEDIUM
/**
 * @param {number[]} rating
 * @return {number}
 */
var numTeams = function (rating) {
  const combine = rating.map((value, index) => [value, index])
  combine.sort((a, b) => a[0] - b[0])
  let result = 0
  for (let i = 1; i < combine.length - 1; i++) {
    let smaller = 0
    let larger = 0
    let xsmaller = 0;
    let xlarger = 0;
    for (let j = 0; j < i; j++) {
      if (combine[j][1] < combine[i][1]) {
        smaller++
      } else {
        xlarger++
      }
    }
    for (let j = i + 1; j < combine.length; j++) {
      if (combine[j][1] > combine[i][1]) {
        larger++
      } else {
        xsmaller++
      }
    }
    result += smaller * larger + xsmaller * xlarger
  }
  return result
};