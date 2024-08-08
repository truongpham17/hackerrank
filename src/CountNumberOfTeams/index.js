// https://leetcode.com/problems/count-number-of-teams/
// MEDIUM
/**
 * @param {number[]} rating
 * @return {number}
 */
var numTeams = function (rating) {
  let result = 0;
  for (let i = 2; i < rating.length; i++) {
    const allowIncrease = []
    const allowDecrease = []
    for (let j = 0; j < i; j++) {
      if (rating[j] < rating[i]) {
        allowIncrease.push(j)
      } else {
        allowDecrease.push(j)
      }
    }
    let count = 0;
    for (let k = 0; k < allowIncrease.length; k++) {
      for (let l = k + 1; l < allowIncrease.length; l++) {
        if (rating[allowIncrease[k]] < rating[allowIncrease[l]] && rating[allowIncrease[l]] < rating[i]) {
          count++
        }
      }
    }

    for (let k = 0; k < allowDecrease.length; k++) {
      for (let l = k + 1; l < allowDecrease.length; l++) {
        if (rating[allowDecrease[k]] > rating[allowDecrease[l]] && rating[allowDecrease[l]] > rating[i]) {
          count++
        }
      }
    }
    result += count
  }
  return result
};
console.log(numTeams([1, 2, 3, 4]))