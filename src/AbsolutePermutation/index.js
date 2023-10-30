let result = [];
let data = [{}];
let visitNodes;

function absolutePermutation(n, k) {
  result = [];
  data = [{}];
  visitNodes = new Array(n + 1).fill(false);
  visitNodes[0] = true;

  if (k === 0) {
    const result = [];
    for (let i = 1; i <= n; i++) {
      result.push(i);
    }
    return result;
  }

  if (k * 2 > n) return [-1];

  for (let i = 1; i <= n; i++) {
    const values = [];
    if (i - k >= 1) {
      values.push(i - k);
    }
    if (i + k <= n) {
      values.push(i + k);
    }
    data.push({
      index: i,
      values,
    });
  }

  return addNode(1, n, k);
}

function addNode(idx, n, k) {
  if (result.length === n) {
    return result;
  }

  const minUnVisitedNode = visitNodes.findIndex((value) => !value);

  if (minUnVisitedNode < idx - k) {
    console.log('---------break-----');
    return;
  }

  if (idx > n) return;

  for (let i = 0; i < data[idx].values.length; i++) {
    const value = data[idx].values[i];
    if (!visitNodes[value]) {
      visitNodes[value] = true;
      result.push(value);
      const next = addNode(idx + 1, n, k);
      if (next) {
        return next;
      } else {
        result.pop();
        visitNodes[value] = false;
      }
    }
  }
}
/**
 * 10
69187 0
55596 42041
49056 0
93559 72338
1394 0
68546 34273
4979 3186
89291 0
86542 1
69652 0
 */

const input = [
  [69187, 0],
  [55596, 42041],
  [49056, 0],
  [93559, 72338],
  [1394, 0],
  // [68546, 34273],
  [4979, 3186],
  [89291, 0],
  [86542, 1],
  [69652, 0],
];

input.forEach((i) => absolutePermutation(i[0], i[1]));
