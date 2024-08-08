const minSparseTable = (array, left, right) => {
  const logn = Math.ceil(Math.log2(array.length));
  const n = array.length

  const st = Array.from({ length: array.length }, () => Array(logn).fill(0));
  for (let i = 0; i < array.length; i++) {
    st[i][0] = array[i]
  }

  let j = 1;
  while ((1 << j) <= n) {
    i = 0;
    // left: i, right: i + 2^j 
    while (i + (1 << j) <= n) {
      st[i][j] = Math.min(st[i][j - 1], st[i + (1 << (j - 1))][j - 1])
      i += 1
    }
    j += 1
  }
  console.log("🚀 ~ minSparseTable ~ st:", st)

  const k = Math.floor(Math.log2(right - left + 1))
  const x = right - (1 << k) + 1;
  // [L, R]
  // L + 2^k - 1 = R -> k = log2(R+1-L)
  // x + 2^k - 1 = R -> x = R + 1 - 2^k
  return Math.min(st[left][k], st[x][k])
}
console.log(minSparseTable([3,4,2], 0,2))