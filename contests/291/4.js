/**
 * @param {string} s
 * @return {number}
 */
var appealSum = function (s) {
  // s[0] + s[1] - s[0] + s[2] - s[1] + ... + s[n] - s[n-1] = s[n]
  // s[1] + s[2] - s[0] + s[3] - s[1] + ... + s[n] - s[n-2] = s[n] + s[n-1] - s[0]
  // s[1] + s[2] - s[0] + s[3] - s[1] = s[3] + s[2] - s[0]
  // s[2] + s[3] - s[0] + ... + s[n] - s[n-3] = s[n] + s[n-1] + s[n-2] - s[0]
  //... = n*s[n] + n-1 * s[n-1] + ... + 1*s[1] - (n-2) * s[0]
  // s[n-1] - s[0] + s[n] - s[1] = s[n - 1] + sn[n] - s[0] - s[1]
  //s[n-2] - s[0] + s[n-1] - s[1] + s[n] - s[2] = s[n] + s[n-1] + s[n-2] - s[0] - s[1] - s[2]
  // pick 1 .. n -> n
  // let say n = 5
  // s[0] + s[1] - s[0] + s[2] - s[1] + s3 - s2 + s4 -s3 + s5 - s4 = s5 - s0
  // s1 + s2-s0 + s3-s1 + s4-s2 + s5-s3 = s5 + s4 - s0
  // s2 + s3-s0 + s4-s1 + s5-s2 = s5 + s4 + s3 - s0
  // s3 + s4-s0 + s5-s1 = s5+s4+s3-s0-s1
  //s4 + s5-s0 = s5 + s4 - s0
  // s5 = s5
  // 6 * s5 + 4*s4 + 2*s3 + 0*s2 - 1*s1 -5*s0
  // n = 3
  // s0 +s1 -s0 + s2-s1 + s3-s2 = s3 - s0
  // s1 + s2 - s0 + s3-s1 = s3 + s2 - s0
  // s2 + s3 - s0 = s3 + s2 - s0
  // s3
  //4 s3, 2s2, 0s1, -3s0

  
  let set = new Set()
  const ps = []
  for (const c of s) {
    set.add(c)
    ps.push(set.size)
  }
  let rs = 0;
  for (let i = 1; i < s.length; i++) {
    rs += ps[i] * i
  }
  rs -= (s.length - 3) * ps[0]
  return rs
};