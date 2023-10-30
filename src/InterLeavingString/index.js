// difficulty level: MEDIUM
// source: https://leetcode.com/problems/interleaving-string/
/**
 * @param {string} s1
 * @param {string} s2
 * @param {string} s3
 * @return {boolean}
 */
var isInterleave = function (s1, s2, s3) {
  const map = new Map();
  map.set('-1_-1', 0);
  map.set('-1_0', s2[0] === s3[0] ? s2[0] : '');
  map.set('0_-1', s1[0] === s3[0] ? s1[0] : '');

  for (let i = 0; i < s1.length; i++) {
    for (let j = 0; j < s2.length; j++) {
      const j_1 = map.get(`${i}_${j - 1}`);
      if (s3[j_1?.length] === s2[j]) {
        map.set(`${i}_${j}`, j_1 + s2[j]);
      }
      const i_1 = map.get(`${i - 1}_${j}`);
      if (s3[i_1?.length] === s1[i]) {
        map.set(`${i}_${j}`, i_1 + s1[i]);
      }
      if (!map.has(`${i}_${j}`)) break;
    }
  }
  console.log(map);
};

isInterleave('aabcc', 'dbbca', 'aadbbcbcac');
/**
 * using DP?
 * a[i]: i is the index of s3, true or false from inter(s1, s2)?
 * a[i + 1] =
 * a[i,j] =
 * a[0,0] = '';
 * a[0,1] = s2[0]
 * a[1,0] = s1[0]
 * a[0,2] = s2[0] + s2[1]
 * a[i, j + 1] = s2[j + 1] === s3[length(a[i,j] + 1)] ? = += s3[]
 * a[i, j + 1] = a[i, j]
 *
 */
