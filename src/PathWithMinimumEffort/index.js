// source: https://leetcode.com/problems/path-with-minimum-effort/?envType=daily-question&envId=2023-09-16
// Difficulty level: MEDIUM
/**
 * @param {number[][]} heights
 * @return {number}
 */
var minimumEffortPath = function (heights) {
  function isNodeExist(row, column) {
    return visitedNode.has(`${row}_${column}`);
  }

  function calculateEffort(r1, c1, r2, c2) {
    return Math.abs(heights[r1][c1] - heights[r2][c2]);
  }

  function getNeighborNodes(row, column) {
    const neighborNodes = [];
    if (row > 0) {
      neighborNodes.push({ row: row - 1, column });
    }
    if (row < heights.length - 1) {
      neighborNodes.push({ row: row + 1, column });
    }
    if (column > 0) {
      neighborNodes.push({ row, column: column - 1 });
    }
    if (column < heights[0].length - 1) {
      neighborNodes.push({ row, column: column + 1 });
    }
    return neighborNodes.filter((node) => !isNodeExist(node.row, node.column));
  }

  let minEffort = 0;

  const visitedNode = new Set();
  const startNode = '0_0';
  const arrVisitedNode = [{ row: 0, column: 0 }];
  visitedNode.add(startNode);

  const desNode = { row: heights.length - 1, column: heights[0].length - 1 };

  if (desNode.row === 0 && desNode.column === 0) return 0;

  while (true) {
    let curMinEffort = Number.MAX_SAFE_INTEGER;
    let nearestNode = null;
    arrVisitedNode.forEach(({ row, column }) => {
      const neighborNodes = getNeighborNodes(row, column);
      neighborNodes.forEach(({ row: nRow, column: nColumn }) => {
        const effort = calculateEffort(row, column, nRow, nColumn);
        if (effort < curMinEffort) {
          curMinEffort = effort;
          nearestNode = { row: nRow, column: nColumn };
        }
      });
    });

    if (curMinEffort > minEffort) {
      minEffort = curMinEffort;
    }

    if (
      desNode.row === nearestNode.row &&
      desNode.column === nearestNode.column
    ) {
      break;
    }

    visitedNode.add(`${nearestNode.row}_${nearestNode.column}`);
    arrVisitedNode.push(nearestNode);
  }

  return minEffort;
};

console.log(
  minimumEffortPath([
    [1, 2, 3],
    [3, 8, 4],
    [5, 3, 5],
  ])
);
