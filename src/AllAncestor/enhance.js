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
      parents: []
    })
    noParent.add(i)
  }

  function addParentToChild(node, parents) {
    map.get(node).parents.push(...parents)
    for (const link of map.get(node).links) {
      addParentToChild(link, parents)
    }
  }

  for (const [from, to] of edges) {
    map.get(from).links.push(to);
    noParent.delete(to)
  }

  const visited = new Set();

  function visit(node) {
    visited.add(node);
    for (const link of map.get(node).links) {
      if (!visited.has(link)) {
        map.get(link).parents.push(node)
        map.get(link).parents.push(...map.get(node).parents)
        visit(link)
      } else {
        addParentToChild(link, [node, ...map.get(node).parents])
      }

    }
  }
  for (const next of [...noParent.keys()]) {
    visit(next)
  }

  return Array.from({ length: n }, (v, k) => k).map(i => map.get(i).parents.sort((a, b) => a - b))
};
console.log(getAncestors(8, [[0, 3], [0, 4], [1, 3], [2, 4], [2, 7], [3, 5], [3, 6], [3, 7], [4, 6]]))