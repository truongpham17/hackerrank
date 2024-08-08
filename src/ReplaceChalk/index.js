/**
 * @param {number[]} chalk
 * @param {number} k
 * @return {number}
 */
var chalkReplacer = function (chalk, k) {
  const totalChalk = chalk.reduce((prev, cur) => cur + prev, 0);
  let remaining = k % totalChalk;
  for (let i = 0; i < chalk.length; i++) {
    if (chalk[i] > remaining) {
      return i
    }
    remaining -= chalk[i]
  }
};