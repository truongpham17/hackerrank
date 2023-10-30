// source: https://leetcode.com/problems/candy/?envType=daily-question&envId=2023-09-13
// Difficulty level: HARD
/**
 * @param {number[]} ratings
 * @return {number}
 */
var candy = function (ratings) {
  const candies = new Array(ratings.length).fill(0);
  candies[0] = 1;
  for (let i = 1; i < ratings.length; i++) {
    if (ratings[i] > ratings[i - 1]) {
      candies[i] = candies[i - 1] + 1;
    } else {
      candies[i] = Math.min(1, candies[i - 1] - 1);
    }
  }

  for (let i = 1; i < ratings.length; i++) {
    if (ratings[i] > ratings[i - 1] && candies[i] <= candies[i - 1]) {
      candies[i] = candies[i - 1] + 1;
    }

    if (candies[i] < 1) {
      candies[i] = 1;
      for (let j = i - 1; j >= 0; j--) {
        if (candies[j] <= candies[j + 1] && ratings[j] > ratings[j + 1]) {
          candies[j] = candies[j + 1] + 1;
        } else {
          break;
        }
      }
    }
  }
  return candies.reduce((sum, candy) => sum + candy, 0);
};

console.log(candy([1, 0, 2]));
// 1 2 3 4 1 = 11
//
