// source: https://leetcode.com/problems/coin-change-ii/
/**
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 * s[0,amount] = amount / c[0]
 * s[1,amount] = s[0] + amount / s[1] + sumi(s[0, amount - c[1] * i])
 * s[i + 1, amount] = s[i, amount] + s[i, amount - c[i + 1] * i];
 *
 */
var change = function (amount, coins) {
  const map = new Map();
  function convertMapLabel(index, amount) {
    return `${index}_${amount}`;
  }

  function calculateValue(index, amount) {
    const label = convertMapLabel(index, amount);
    if (map.has(label)) return map.get(label);

    if (index === 0) {
      if (amount % coins[index] === 0) {
        map.set(label, 1);
        return 1;
      }
      map.set(label, 0);
      return 0;
    }

    const count = Math.floor(amount / coins[index]);
    let total = 0;
    for (let i = 0; i <= count; i++) {
      total += calculateValue(index - 1, amount - coins[index] * i);
    }
    map.set(label, total);
    return total;
  }
  return calculateValue(coins.length - 1, amount);
};

console.log(change(5, [1, 2, 5]));
