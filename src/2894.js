/**
 * @param {number} n
 * @param {number} m
 * @return {number}
 */
var differenceOfSums = function (n, m) {
  const k = Math.floor(n / m)
  const sum = n * (n + 1) / 2
  const partialSum = k * (k + 1) / 2 * m
  return sum - 2 * partialSum
};

console.log(differenceOfSums(10, 3))
// ranging from 1 to n
// m, 2m, ... km <=n
// -> m(1+2+..+k)<=n
// -> 1+k <=n/m
// k(K+1)/2<=n/m
//k(k+1)<=2n/m
//k^2+k-2n/m=0
// delta = b2-4ac = 1+8n/m
// x = (-b-/ sqlrdelta)/2a = -1 +- can delta / 2
//1m 2m 3m
//km <=n -> k <=n/m