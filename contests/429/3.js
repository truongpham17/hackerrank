
/**
 * @param {string} s
 * @param {number} numOps
 * @return {number}
 */
var minLength = function (s, numOps) {
  function canSplitWithMaxLength(s, k, maxLen) {
    const arr = s.split('')
    let same = 0;
    let curChar = ''
    for (let i = 0; i < s.length; i++) {
      if (k < 0) return false
      if (arr[i] !== curChar) {
        curChar = arr[i]
        same = 1
      } else {
        same++
        if (same > maxLen) {
          // flip
          arr[i-1] = arr[i-1] === '0' ? '1' : '0'
          k--
          same = 1
          curChar = arr[i]
        }
      }
    }

    if (same > maxLen) {
      k--
    }
    
    return k >= 0
  }


  let low = 1, high = s.length;

  let result = high;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);

    if (canSplitWithMaxLength(s, numOps, mid)) {
      result = mid; // Update the result to the smaller max length
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }

  return result;
}

// Example Usage
const s = "1101";
const k = 1;

console.log(minLength(s, k)); 
