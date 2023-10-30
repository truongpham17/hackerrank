// source: https://leetcode.com/problems/path-with-maximum-probability/
/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number[]} succProb
 * @param {number} start
 * @param {number} end
 * @return {number}
 */
var maxProbability = function (n, edges, succProb, start, end) {
  const matrix = new Array(n);
  const priorityHeap = [];
  const weight = new Map();
  const visited = new Set();
  const queuePosition = new Map();

  for (let i = 0; i < n; i++) {
    matrix[i] = new Map();
  }

  edges.forEach(([a, b], index) => {
    matrix[a].set(b, succProb[index]);
    matrix[b].set(a, succProb[index]);
  });

  function getWeight(i) {
    return weight.get(i) || 0;
  }

  function setWeight(i, w) {
    weight.set(i, w);
  }

  function heapify(i) {
    const left = i * 2 + 1;
    const right = i * 2 + 2;
    let max = i;
    if (
      left < priorityHeap.length &&
      getWeight(priorityHeap[left]) > getWeight(priorityHeap[i])
    ) {
      max = left;
    }
    if (
      right < priorityHeap.length &&
      getWeight(priorityHeap[right]) > getWeight(priorityHeap[max])
    ) {
      max = right;
    }
    if (max !== i) {
      swap(i, max);
      heapify(max);
    }
  }

  function swap(a, b) {
    [priorityHeap[a], priorityHeap[b]] = [priorityHeap[b], priorityHeap[a]];
    const parentPosition = queuePosition.get(priorityHeap[a]);
    const currentPosition = queuePosition.get(priorityHeap[b]);
    queuePosition.set(priorityHeap[b], parentPosition);
    queuePosition.set(priorityHeap[a], currentPosition);
  }

  function popHeap() {
    if (priorityHeap.length === 0) return undefined;
    if (priorityHeap.length === 1) {
      return priorityHeap.pop();
    }
    const highest = priorityHeap[0];
    priorityHeap[0] = priorityHeap.pop();
    heapify(0);
    return highest;
  }

  function parentHeap(i) {
    return Math.floor((i - 1) / 2);
  }

  function addHeap(index, isUpdate) {
    let i;
    if (!isUpdate) {
      priorityHeap.push(index);
      i = priorityHeap.length - 1;
      queuePosition.set(index, i);
    } else {
      i = queuePosition.get(index);
    }

    while (
      i !== 0 &&
      getWeight(priorityHeap[parentHeap(i)]) < getWeight(priorityHeap[i])
    ) {
      swap(parentHeap(i), i);
      i = parentHeap(i);
    }
  }

  function getValue(i, j) {
    return matrix[i].get(j);
  }

  setWeight(start, 1);
  addHeap(start);

  let curNode = popHeap();
  while (curNode !== undefined) {
    if (visited.has(curNode)) {
      curNode = popHeap();
      continue;
    }
    visited.add(curNode);
    if (curNode === end) {
      return getWeight(curNode);
    }
    const keys = [...matrix[curNode].keys()];
    for (let i = 0; i < keys.length; i++) {
      const nextNode = keys[i];
      const newWeight = getWeight(curNode) * getValue(nextNode, curNode);
      if (!visited.has(nextNode) && newWeight > getWeight(nextNode)) {
        const isUpdate = getWeight(nextNode) > 0;
        setWeight(nextNode, newWeight);
        addHeap(nextNode, isUpdate);
      }
    }
    curNode = popHeap();
  }
  return 0;
};

console.log(
  maxProbability(
    6,
    [
      [2, 0],
      [2, 3],
      [2, 5],
      [2, 4],
      [5, 3],
      [3, 1],
      [0, 3],
      [4, 5],
      [5, 0],
    ],
    [0.8701, 0.9375, 0.5994, 0.1174, 0.6767, 0.6912, 0.0488, 0.1562, 0.9872],
    5,
    3
  )
);
