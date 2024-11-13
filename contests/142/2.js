/**
 * @param {number[]} parent
 * @param {string} s
 * @return {number[]}
 */
var findSubtreeSizes = function (parent, s) {
  const n = s.length;
  const tree = Array.from({ length: n }, () => new Set());

  for (let i = 1; i < n; i++) {
    tree[parent[i]].add(i);
  }


  const travel = (node, map) => {
    const value = s[node];
    if (map.get(value) !== undefined) {
      // update parent
      if (map.get(value) !== parent[node]) {
        tree[map.get(value)].add(node)
        tree[parent[node]].delete(node)
      }
    }
    const oldMap = map.get(value)

    map.set(value, node)
    for (const child of tree[node].keys()) {
      travel(child, map)
    }
    map.set(value, oldMap)
  }

  // count the diff
  const rs = Array(n).fill(0)
  const reTravel = (node) => {
    let value = 1
    for (const c of tree[node].keys()) {
      value += reTravel(c)
    }
    rs[node] = value
    return rs[node]
  }

  travel(0, new Map())
  reTravel(0)
  return rs
};
console.log(findSubtreeSizes([-1], "a"))