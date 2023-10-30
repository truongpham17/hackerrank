// source: https://leetcode.com/problems/solving-questions-with-brainpower/
/**
 * @param {number[][]} questions
 * @return {number}
 */
var mostPoints = function (questions) {
  const a = new Array(questions.length);

  questions.forEach((value, index) => {
    a[questions.length - index - 1] = value;
  });

  const s = new Array(a.length).fill(0);
  s[0] = a[0][0];

  for (let i = 1; i < a.length; i++) {
    s[i] = Math.max(s[i - 1], a[i][0] + (s[i - a[i][1] - 1] || 0));
  }
  return s[a.length - 1];
};
