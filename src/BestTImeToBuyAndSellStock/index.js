// source: https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/
/**
 * @param {number[]} prices
 * @param {number} fee
 * @return {number}
 */
var maxProfit = function (prices, fee) {
  const n = prices.length;
  const profits = [];
  for (let i = 0; i < n; i++) {
    profits.push(new Array(n).fill(undefined));
    profits[i][i] = 0;
  }

  function calculateProfit(i, j) {
    if (profits[i][j] !== undefined) return profits[i][j];

    if (j === i + 1) {
      profits[i][j] = prices[j] - prices[i] - fee;
      return profits[i][j];
    }

    let max = Math.max(prices[j] - prices[i] - fee, 0);
    for (let k = i; k < j; k++) {
      const newProfit = calculateProfit(i, k) + calculateProfit(k + 1, j);
      if (newProfit > max) {
        max = newProfit;
      }
    }
    profits[i][j] = max;
    return profits[i][j];
  }
  return calculateProfit(0, n - 1);
};
console.log(maxProfit([9, 8, 7, 1, 2], 3));
