

class SegmentTree {
  constructor(points) {
    this.n = points.length;
    this.points = points;
    this.tree = new Array(4 * this.n).fill(0);
    this.lazy = new Array(4 * this.n).fill(0);
  }

  _push(node, start, end) {
    if (this.lazy[node] !== 0) {
      this.tree[node] += this.lazy[node];
      if (start !== end) {
        this.lazy[2 * node + 1] += this.lazy[node];
        this.lazy[2 * node + 2] += this.lazy[node];
      }
      this.lazy[node] = 0;
    }
  }

  _updateRange(node, start, end, l, r, val) {
    this._push(node, start, end);

    if (start > r || end < l) return;

    if (start >= l && end <= r) {
      this.lazy[node] += val;
      this._push(node, start, end);
      return;
    }

    let mid = Math.floor((start + end) / 2);
    this._updateRange(2 * node + 1, start, mid, l, r, val);
    this._updateRange(2 * node + 2, mid + 1, end, l, r, val);
    this.tree[node] = Math.min(this.tree[2 * node + 1], this.tree[2 * node + 2]);
  }

  increaseRange(l, r, delta = 1) {
    this._updateRange(0, 0, this.n - 1, l, r, delta);
  }

  _getMinWeight(node, start, end) {
    this._push(node, start, end);
    if (start === end) {
      return { weight: this.tree[node] * this.points[start], index: start, value: this.points[start] };
    }
    let mid = Math.floor((start + end) / 2);
    let leftResult = this._getMinWeight(2 * node + 1, start, mid);
    let rightResult = this._getMinWeight(2 * node + 2, mid + 1, end);
    return leftResult.weight <= rightResult.weight ? leftResult : rightResult;
  }

  getMinWeight() {
    return this._getMinWeight(0, 0, this.n - 1);
  }

  _getMaxWeight(node, start, end) {
    this._push(node, start, end);
    if (start === end) {
      return { weight: this.tree[node] * this.points[start], index: start };
    }
    let mid = Math.floor((start + end) / 2);
    let leftResult = this._getMaxWeight(2 * node + 1, start, mid);
    let rightResult = this._getMaxWeight(2 * node + 2, mid + 1, end);
    return leftResult.weight >= rightResult.weight ? leftResult : rightResult;
  }

  getMaxWeight() {
    return this._getMaxWeight(0, 0, this.n - 1);
  }

  _getMinValue(node, start, end) {
    this._push(node, start, end);
    if (start === end) {
      return { value: this.tree[node], index: start };
    }
    let mid = Math.floor((start + end) / 2);
    let leftResult = this._getMinValue(2 * node + 1, start, mid);
    let rightResult = this._getMinValue(2 * node + 2, mid + 1, end);
    return leftResult.value <= rightResult.value ? leftResult : rightResult;
  }

  getMinValue() {
    return this._getMinValue(0, 0, this.n - 1);
  }

  _getAllWeights(node, start, end, result) {
    this._push(node, start, end);
    if (start === end) {
      result[start] = this.tree[node] * this.points[start];
      return;
    }
    let mid = Math.floor((start + end) / 2);
    this._getAllWeights(2 * node + 1, start, mid, result);
    this._getAllWeights(2 * node + 2, mid + 1, end, result);
  }

  getAllWeights() {
    let result = new Array(this.n).fill(0);
    this._getAllWeights(0, 0, this.n - 1, result);
    return result;
  }
  applyLazyUpdates() {
    for (let i = 0; i < this.n; i++) {
      this._push(0, 0, this.n - 1);
    }
  }
  multiplyAllValues(k) {
    for (let i = 0; i < this.n; i++) {
      this.points[i] *= k;
    }
  }

}

/**
 * @param {number[]} points
 * @param {number} m
 * @return {number}
 */
var maxScore = function (points, m) {
  const segTree = new SegmentTree(points)
  let curStep = -1
  let stepCount = 0;
  while (stepCount < m) {
    let index = segTree.getMinWeight().index;
    if (index === curStep) {
      if (index === 0) {
        index = 1
      } else if (index === points.length - 1) {
        index--
      }
    }
    if (index > curStep) {
      segTree.increaseRange(curStep + 1, index, 1)
    } else {
      segTree.increaseRange(index, curStep - 1, 1)
    }

    const minWeight = segTree.getMinWeight()
    if (segTree.getMaxWeight().weight < minWeight.weight + points[minWeight.index]) {
      if (index > curStep) {
        segTree.increaseRange(curStep + 1, index, -1)
      } else {
        segTree.increaseRange(index, curStep - 1, -1)
      }
      break
    }
    curStep = index
    stepCount++
  }

  segTree.applyLazyUpdates();

  if (stepCount === m) {
    return segTree.getMinWeight().weight;
  }

  const left = m % stepCount
  const round = Math.floor(m / stepCount)

  if (round > 1) {
    segTree.multiplyAllValues(round)
  }

  for (let i = 0; i < left; i++) {
    let index = segTree.getMinWeight().index;
    if (index === curStep) {
      if (index === 0) {
        index = 1
      } else if (index === points.length - 1) {
        index--
      }
    }

    if (index > curStep) {
      segTree.increaseRange(curStep + 1, index, 1)
    } else {
      segTree.increaseRange(index, curStep - 1, 1)
    }
  }
  segTree.applyLazyUpdates();
  console.log("🚀 ~ maxScore ~ segTree:", segTree, points)

  return segTree.getMinWeight().weight;
};


console.log(maxScore([23, 10, 7], 25))
console.log(maxScore([2, 4], 3))