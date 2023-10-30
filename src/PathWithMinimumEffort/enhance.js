/**
 * @param {number[][]} heights
 * @return {number}
 */
var minimumEffortPath = function (heights) {
  const tRow = heights.length;
  const tCol = heights[0].length;
  const heap = [];
  const efforts = new Array(tRow * tCol - 1);

  const addHeap = ({ row, col, effort }) => {
    const index = getIndexFromCoords({ row, col });
    efforts[index] = effort;
    heap.push([index, effort]);
    bubbleUp(heap.length - 1);
  };

  const popHeap = () => {
    if (heap.length === 0) return null;
    const minNode = heap[0];
    if (heap.length > 1) {
      heap[0] = heap[heap.length - 1];
      heap.length = heap.length - 1;
      bubbleDown(0);
    } else {
      heap.length = 0;
    }
    return minNode;
  };

  const swapNodes = (indexA, indexB) => {
    [heap[indexA], heap[indexB]] = [heap[indexB], heap[indexA]];
  };

  const getParentNode = (nodeIndex) => {
    return Math.floor((nodeIndex - 1) / 2);
  };

  const bubbleUp = (index) => {
    if (index === 0) return;
    const parent = getParentNode(index);
    if (heap[index][1] < heap[parent][1]) {
      swapNodes(index, parent);
      bubbleUp(parent);
    }
  };

  const bubbleDown = (index) => {
    const leftChild = index * 2 + 1;
    const rightChild = index * 2 + 2;
    let tempNode = index;
    if (leftChild < heap.length && heap[leftChild][1] < heap[tempNode][1]) {
      tempNode = leftChild;
    }
    if (rightChild < heap.length && heap[rightChild][1] < heap[tempNode][1]) {
      tempNode = rightChild;
    }
    if (tempNode !== index) {
      swapNodes(tempNode, index);
      bubbleDown(tempNode);
    }
  };

  const getCoords = (index) => {
    const iRow = Math.floor(index / tCol);
    const iCol = index - iRow * tCol;
    return { row: iRow, col: iCol };
  };

  const getIndexFromCoords = ({ row, col }) => {
    return row * tCol + col;
  };

  function getNeighborNodes(index) {
    const neighborNodes = [];
    const { row, col } = getCoords(index);
    if (row > 0) {
      neighborNodes.push({ row: row - 1, col });
    }
    if (row < heights.length - 1) {
      neighborNodes.push({ row: row + 1, col });
    }
    if (col > 0) {
      neighborNodes.push({ row, col: col - 1 });
    }
    if (col < heights[0].length - 1) {
      neighborNodes.push({ row, col: col + 1 });
    }
    return neighborNodes;
  }

  function calculateEffort(r1, c1, r2, c2) {
    return Math.abs(heights[r1][c1] - heights[r2][c2]);
  }

  const START_POSITION = 0;
  const DES_POSITION = getIndexFromCoords({ row: tRow - 1, col: tCol - 1 });
  const visitedNode = new Set();
  visitedNode.add(START_POSITION);
  let minEffort = 0;

  addHeap({ row: 0, col: 0, effort: 0 });

  while (true) {
    const nearestNode = popHeap();
    if (nearestNode === null) break;
    if (nearestNode[1] > minEffort) {
      minEffort = nearestNode[1];
    }
    if (nearestNode[0] === DES_POSITION) {
      break;
    }
    visitedNode.add(nearestNode[0]);
    const neighborNodes = getNeighborNodes(nearestNode[0]);
    const nearPointCoords = getCoords(nearestNode[0]);

    neighborNodes.forEach(({ row, col }) => {
      const neighborIndex = getIndexFromCoords({ row, col });
      if (!visitedNode.has(neighborIndex)) {
        const effort = calculateEffort(
          row,
          col,
          nearPointCoords.row,
          nearPointCoords.col
        );

        if (
          efforts[neighborIndex] === undefined ||
          effort < efforts[neighborIndex]
        ) {
          addHeap({ row, col, effort });
        }
      }
    });
  }
  return minEffort;
};

console.log(
  minimumEffortPath([
    [1, 5, 5, 9, 10, 10, 1, 7],
    [3, 5, 6, 6, 9, 9, 4, 8],
    [10, 5, 10, 9, 2, 2, 8, 6],
    [3, 9, 5, 3, 6, 8, 6, 5],
  ])
);

/**
 *  [1x, 5x, 5x, 9x, 10x, 10x, 1, 7],
    [3x, 5x, 6x, 6x, 9x, 9, 4, 8],
    [10, 5x, 10x, 9, 2, 2, 8, 6],
    [3, 9, 5, 3, 6, 8, 6, 5],
 */
