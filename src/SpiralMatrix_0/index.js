/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function (n, m) {
  // const n = matrix.length;
  // const m = matrix[0].length;
  let direction = 0; // 0 for ⇀, 1 ⇂, 2 for ←, 3 for ↑

  const arr = new Array(n);
  for (let i = 0; i < n; i++) {
    arr[i] = new Array(m);
  }

  let value = 1;
  let pivot = 0;
  let count = 0;
  while (count < n * m) {
    let max = -1;
    if (direction === 0) {
      for (let i = 0; i < m; i++) {
        if (!arr[pivot][i]) {
          arr[pivot][i] = value;
          value++;
          max = i;
          count++;
        }
      }
    } else if (direction === 1) {
      for (let i = 0; i < n; i++) {
        if (!arr[i][pivot]) {
          arr[i][pivot] = value;
          value++;
          max = i;
          count++;
        }
      }
    } else if (direction === 2) {
      for (let i = m - 1; i >= 0; i--) {
        if (!arr[pivot][i]) {
          arr[pivot][i] = value;
          value++;
          max = i;
          count++;
        }
      }
    } else if (direction === 3) {
      for (let i = n - 1; i >= 0; i--) {
        if (!arr[i][pivot]) {
          arr[i][pivot] = value;
          value++;
          max = i;
          count++;
        }
      }
    }
    pivot = max;
    direction = (direction + 1) % 4;
  }
  console.log(arr);
  return arr;
};

spiralOrder(3, 4);
