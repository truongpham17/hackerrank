/**
 * @param {string} s
 * @return {number}
 */
var minimumSteps = function (s) {
  let desirePos = s.length - 1;
  let rs = 0;
  for (let i = s.length - 1; i >= 0; i--) {
    if (s[i] === '1') {
      rs += desirePos - i
      desirePos--
    }
  }
  return rs
};