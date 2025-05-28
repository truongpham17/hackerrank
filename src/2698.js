/**
 * @param {number} n
 * @return {number}
 */
var punishmentNumber = function (n) {
  /**
  const canSumTo = (target, str) => {
    if (target === Number(str || '0')) {
      return true;
    }
    if (target < 0) return false;
    let find = false;
    for (let i = 1; i < str.length; i++) {
      if (canSumTo(target - Number(str.substring(0, i)), str.substring(i))) {
        find = true;
        break
      }
    }
    return find;
  }

  let rs = []
  for (let i = 1; i <= 1000; i++) {
    const mul = i ** 2;
    if (canSumTo(i, mul.toString())) {
      rs.push(i)
    }
  }
  return rs
  */
  const rs = [
    1, 9, 10, 36, 45, 55,
    82, 91, 99, 100, 235, 297,
    369, 370, 379, 414, 657, 675,
    703, 756, 792, 909, 918, 945,
    964, 990, 991, 999, 1000
  ]
  let i = 0;
  let sum = 0;
  while (i < rs.length && rs[i] <= n) {
    sum += rs[i] ** 2
    i++
  }
  return sum
};
console.log(punishmentNumber())