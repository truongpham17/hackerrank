/**
 * @param {string} s1
 * @param {string} s2
 * @param {number} x
 * @return {number}
 */
var minOperations = function (s1, s2, x) {
  let error = 0;
  for (let i = 0; i < s1.length; i++) {
    if (s1[i] !== s2[i]) {
      error++;
    }
  }
  if (error % 2 !== 0) return -1;
  const diffs = [];
  for (let index = 0; index < s1.length; index++) {
    if (s1[index] !== s2[index]) {
      diffs.push(index);
    }
  }

  const diffsDistance = [0];
  for (let i = 1; i < diffs.length; i++) {
    if (diffs[i] - diffs[i - 1] > x) {
      diffsDistance[i] = diffsDistance[i - 1] + x / 2;
    } else {
      const d1 = i === 1 ? x : diffsDistance[i - 1] + x / 2;
      const d2 = (diffsDistance[i - 2] || 0) + diffs[i] - diffs[i - 1];
      if (d1 < d2) {
        diffsDistance[i] = d1;
      } else {
        console.log(i);
        diffsDistance[i] = d2 + (i === 2 ? x / 2 : 0);
      }
    }
  }
  return diffsDistance[diffsDistance.length - 1];
};

console.log(minOperations('101', '000', 2));
