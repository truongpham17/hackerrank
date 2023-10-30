// source:https://leetcode.com/problems/naming-a-company/
/**
 * @param {string[]} ideas
 * @return {number}
 */
const factorials = [1];
function calculateFactorials(n) {
  if (factorials[n]) return factorials[n];
  let s = factorials[factorials.length - 1];
  for (let i = factorials.length; i <= n; i++) {
    s *= i;
    factorials.push(s);
  }
  return s;
}
var distinctNames = function (ideas) {
  const map = new Map();
  const repNames = [];
  for (let i = 0; i < ideas.length; i++) {
    const truncName = ideas[i].slice(1, ideas[i].length);
    if (!map.has(truncName)) {
      map.set(truncName, ideas[i][0]);
    } else {
      const repCount = map.get(truncName).length;
      if (repCount === 1) {
        repNames.push(truncName);
      }
      map.set(truncName, map.get(truncName) + ideas[i][0]);
    }
  }

  let excludeCount = 0;
  for (let i = 0; i < repNames.length; i++) {
    const repCount = map.get(repNames[i]);
    excludeCount +=
      calculateFactorials(repCount) / (2 * calculateFactorials(repCount - 2));
  }
  return (
    calculateFactorials(ideas.length) /
      (2 * calculateFactorials(ideas.length - 2)) -
    excludeCount
  );
};

console.log(distinctNames(['coffee', 'donuts', 'time', 'toffee']));
