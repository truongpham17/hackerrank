/**
 * @param {number[][]} books
 * @param {number} shelfWidth
 * @return {number}
 */
var minHeightShelves = function (books, shelfWidth) {
  const dp = Array(books.length).fill(0)
  dp[0] = books[0][1]
  for (let i = 1; i < books.length; i++) {
    const [width, height] = books[i]
    dp[i] = dp[i - 1] + height
    let w = width;
    let h = height
    for (let j = i - 1; j >= 0; j--) {
      w += books[j][0]
      if (w > shelfWidth) {
        break
      }
      h = Math.max(h, books[j][1])
      dp[i] = Math.min((dp[j - 1] || 0) + h, dp[i])
    }
  }
  return dp[books.length - 1]
};
console.log(minHeightShelves([[1, 3], [2, 4], [3, 2]], 6))