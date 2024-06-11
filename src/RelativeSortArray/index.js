//https://leetcode.com/problems/relative-sort-array/?envType=daily-question&envId=2024-06-11
//EASY
/**
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @return {number[]}
 */
var relativeSortArray = function (arr1, arr2) {
  const map = new Map();
  for (const item of arr2) {
    map.set(item, 0)
  }
  const result = []
  const rest = [];

  for (const item of arr1) {
    if (map.has(item)) {
      map.set(item, map.get(item) + 1)
    } else {
      rest.push(item)
    }
  }

  for (const item of arr2) {
    for (let i = 0; i < map.get(item); i++) {
      result.push(item)
    }
  }

  rest.sort((a, b) => a - b);
  result.push(...rest)
  return result;
};

console.log(relativeSortArray([2, 3, 1, 3, 2, 4, 6, 7, 9, 2, 19], [2, 1, 4, 3, 9, 6]))