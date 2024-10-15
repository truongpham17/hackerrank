/**
 * @param {number[]} skill
 * @return {number}
 */
var dividePlayers = function (skill) {
  let sum = skill.reduce((sum, cur) => sum + cur, 0)
  skill = countingSort(skill)

  const teamValue = sum / (skill.length / 2)
  if (teamValue !== Math.round(teamValue)) return -1
  let rs = 0
  for (let i = 0; i < skill.length / 2; i++) {
    if (skill[i] + skill[skill.length - 1 - i] !== teamValue) return - 1
    rs += skill[i] * skill[skill.length - 1 - i]
  }
  return rs

};

function countingSort(arr) {
  // Step 1: Find the maximum value in the array
  const max = Math.max(...arr);

  // Step 2: Initialize the counting array with zeros
  const count = new Array(max + 1).fill(0);

  // Step 3: Count the occurrences of each element in the original array
  for (let i = 0; i < arr.length; i++) {
    count[arr[i]]++;
  }

  // Step 4: Modify the original array with sorted elements
  let index = 0;
  for (let i = 0; i <= max; i++) {
    while (count[i] > 0) {
      arr[index] = i;
      index++;
      count[i]--;
    }
  }

  return arr;
}

