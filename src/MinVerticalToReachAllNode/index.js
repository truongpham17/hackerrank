// source: https://leetcode.com/problems/minimum-number-of-vertices-to-reach-all-nodes/

/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number[]}
 */
var findSmallestSetOfVertices = function (n, edges) {
  const checked = new Array(n);
  edges.forEach((e) => {
    if (checked[e[0]] === undefined) {
      checked[e[0]] = true;
    }
    checked[e[1]] = false;
  });
  return checked.map((v, i) => (v ? i : v)).filter((v) => v || v === 0);
};
