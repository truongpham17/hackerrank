// source: https://leetcode.com/problems/group-the-people-given-the-group-size-they-belong-to/?envType=daily-question&envId=2023-09-11
// Difficulty level: MEDIUM
/**
 * @param {number[]} groupSizes
 * @return {number[][]}
 */
var groupThePeople = function (groupSizes) {
  const map = new Map();
  const result = [];

  groupSizes.forEach((groupLength, index) => {
    if (!map.has(groupLength)) {
      map.set(groupLength, []);
    }
    map.get(groupLength).push(index);
  });

  for (const [key, value] of map.entries()) {
    result.push([]);
    value.forEach((person) => {
      const length = result.length;
      const currentGroup = result[length - 1];
      if (currentGroup.length < key) {
        currentGroup.push(person);
      } else {
        result.push([person]);
      }
    });
  }

  return result;
};

console.log(groupThePeople([2, 1, 3, 3, 3, 2]));
