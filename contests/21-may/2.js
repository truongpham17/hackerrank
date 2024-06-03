const findWays = (arr) => {
  let allWays = 0;
  const [k, ...next] = arr
  for (let i = 1; i < k; i++) {
    if (!next.includes(i)) {
      if (i % 2 === 1 && !next.includes(i + 1)) {
        allWays += 1
      }
      if (!next.includes(i + 2) && i + 2 <= k) {
        allWays += 1
      }
    }
  }
  return allWays;
}

console.log(findWays([12, 2, 6, 7, 11]))