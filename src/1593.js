/**
 * @param {string} s
 * @return {number}
 */
var maxUniqueSplit = function (s) {
  let max = 0
  const find = (index, count, set) => {
    for (let i = index + 1; i <= s.length; i++) {
      const substr = s.substring(index, i)
      if (max >= set.size + s.length - index) {
        continue;
      }
      if (!set.has(substr)) {
        if (i === s.length) {
          console.log(set)
          max = Math.max(max, count + 1)
        } else {
          set.add(substr)
          find(i, count + 1, set)
          set.delete(substr)
        }
      }
    }
  }
  find(0, 0, new Set())
  return max
};
console.log(maxUniqueSplit('wwwzfvedwfvhsww'))