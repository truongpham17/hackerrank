/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var minChanges = function (n, k) {
  const bitN = n.toString(2)
  const bitK = k.toString(2)

  if (bitK.length > bitN.length) {
    return -1
  }

  let result = 0;

  for (let i = 0; i < bitN.length; i++) {
    if (bitN[bitN.length - 1 - i] === '1' && bitK[bitK.length - 1 - i] !== '1') {
      result++
    }
    if (bitN[bitN.length - 1 - i] === '0' && bitK[bitK.length - 1 - i] === '1') {
      return -1
    }
  }
  return result
};
console.log(minChanges(11, 56))