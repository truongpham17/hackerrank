/**
 * @param {string} s
 * @param {string} p
 * @return {number}
 */
var shortestMatchingSubstring = function (s, p) {
  const splits = p.split("*").filter(Boolean);
  const n = splits.length;
  if (n === 0) return 0;
  const pos = []
  for (const sub of splits) {
    pos.push(KMP(sub, s))
  }

  function existsInRange(arr, a, b) {
    let left = 0, right = arr.length - 1;
    while (left <= right) {
      let mid = Math.floor((left + right) / 2);

      if (arr[mid] - splits[1].length > a && arr[mid] < b) {
        return true;
      } else if (arr[mid] <= a) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    return false;
  }



  if (n === 1) {
    if (pos[0].length === 0) {
      return -1
    }
    return splits[0].length
  }

  let min = 10 ** 10;
  const check = (a, b) => {
    if (a >= pos[0].length || b < 0) return;
    if (pos[0][a] + splits[0].length - 1 >= pos[1][b]) return;
    min = Math.min(min, pos[1][b] + splits[1].length - pos[0][a])
    check(a + 1, b)
    check(a, b - 1)
  }

  if (n === 2) {
    check(0, pos[1].length - 1)
    return min === 10 ** 10 ? -1 : min
  }

  const check2 = (a, b) => {
    if (a >= pos[0].length || b < 0) return;
    if (pos[0][a] + splits[0].length - 1 >= pos[2][b]) return;
    if (existsInRange(pos[1], pos[0][a] + splits[0].length - 1, pos[2][b])) {
      min = Math.min(min, pos[2][b] + splits[2].length - pos[0][a])
    }
    check2(a + 1, b)
    check2(a, b - 1)
  }

  for (let i = 0; i < pos[1].length; i++) {
    pos[1][i] += splits[1].length - 1
  }

  check2(0, pos[2].length - 1)

  return min === 10 ** 10 ? -1 : min

};


const KMP = (pat, string) => {
  const constructLps = (pat) => {
    const lps = Array(pat.length).fill(0)
    let len = 0
    let i = 1
    while (i < pat.length) {
      if (pat[i] === pat[len]) {
        len++
        lps[i] = len
        i++
      } else {
        if (len !== 0) {
          len = lps[len - 1]
        } else {
          i++
        }
      }
    }
    return lps
  }

  const lps = constructLps(pat)

  let i = 0
  let j = 0
  const rs = []

  while (string.length - i >= pat.length - j) {
    if (pat[j] === string[i]) {
      j++
      i++
      if (j === pat.length) {
        rs.push(i - j)
        j = lps[j - 1]
      }
    } else {
      if (j === 0) {
        i++
      } else {
        j = lps[j - 1]
      }
    }
  }
  return rs
}

// console.log(shortestMatchingSubstring("abaacbaecebce", p = "ba*c*ce"))
console.log(shortestMatchingSubstring("ftewpmeyawxmmu", "e*meya*xmmu"))