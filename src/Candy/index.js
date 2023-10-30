// source: https://leetcode.com/problems/candy/?envType=daily-question&envId=2023-09-13
// Difficulty level: HARD
/**
 * @param {number[]} ratings
 * @return {number}
 */
var candy = function (ratings) {
  const candies = new Array(ratings.length).fill(0);
  let findAvailable = true;
  // find if there is no smaller alternative, not set, if it has, the smaller must be all set

  const isValid = (childIndex) => {
    if (candies[childIndex] > 0) return false;
    let result = 0;
    if (childIndex > 0) {
      if (ratings[childIndex] > ratings[childIndex - 1]) {
        if (candies[childIndex - 1] === 0) return false;
        result = candies[childIndex - 1];
      }
    }
    if (childIndex < ratings.length - 1) {
      if (ratings[childIndex] > ratings[childIndex + 1]) {
        if (candies[childIndex + 1] === 0) return false;
        if (candies[childIndex + 1] > result) {
          result = candies[childIndex + 1];
        }
      }
    }
    return result;
  };
  let result = 0;
  while (findAvailable) {
    findAvailable = false;
    ratings.forEach((rating, childIndex) => {
      const minCandy = isValid(childIndex);
      if (minCandy !== false) {
        findAvailable = true;
        candies[childIndex] = minCandy + 1;
        result += minCandy + 1;
      }
    });
  }
  return result;
};

console.log(candy([1, 2, 2]));
