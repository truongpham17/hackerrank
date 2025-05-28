/**
 * @param {number} n
 * @return {number}
 */
var numTilings = function (n) {
  const arr = [0, 1, 2, 5, 11, 24]
  for (let i = 6; i <= n; i++) {
    let rs = 0;
    rs = arr[i - 1] + 1
    rs += arr[i - 2] + 1
    rs += arr[i - 3] + 2
    rs += arr[i - 4] + 1
    rs += arr[i - 5] + 1
    arr.push(rs)
  }
  return arr[n]
};
console.log(numTilings(6))
/**
 * 1 = 1
 * 2 = 2 -> + 1
 * 3 = 5 -> + 3
 */