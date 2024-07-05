/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number[][]}
 */
var getAncestors = function (n, edges) {
  const map = new Map();
  const noParent = new Set();
  for (let i = 0; i < n; i++) {
    map.set(i, {
      links: [],
      parents: new Set()
    })
    noParent.add(i)
  }

  for (const [from, to] of edges) {
    map.get(from).links.push(to);
    noParent.delete(to)
  }
  let nodeToVisit = [...noParent.keys()]

  while (nodeToVisit.length > 0) {
    const nextNodeToVisit = new Set();
    for (const node of nodeToVisit) {
      for (const link of map.get(node).links) {
        map.get(link).parents = new Set([node, ...map.get(node).parents, ...map.get(link).parents])
        nextNodeToVisit.add(link)
      }
    }
    nodeToVisit = [...nextNodeToVisit.keys()]
  }
  return Array.from({ length: n }, (v, k) => k).map(i => [...map.get(i).parents].sort((a, b) => a - b))

};
console.log(getAncestors(8, [[0, 3], [0, 4], [1, 3], [2, 4], [2, 7], [3, 5], [3, 6], [3, 7], [4, 6]]))