const getMirror = (char) => {
  const base = 'a'.charCodeAt(0);
  const mirroredCharCode = base + (25 - (char.charCodeAt(0) - base));

  // Return the mirrored character
  return String.fromCharCode(mirroredCharCode);
}

/**
 * @param {string} s
 * @return {number}
 */
var calculateScore = function (s) {
  const map = new Map()
  let score = 0;
  for (let i = 0; i < s.length; i++) {
    const char = s[i]
    const mirror = getMirror(char)
    const arr = map.get(mirror);
    if (arr?.length > 0) {
      const nearIndex = arr[arr.length - 1]
      score += i - nearIndex
      arr.pop()
      continue
    }
    // add to arr
    if (!map.has(char)) {
      map.set(char, [])
    }
    map.get(char).push(i)
  }
  return score
};
console.log(calculateScore('aazz'))