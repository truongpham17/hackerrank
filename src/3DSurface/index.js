function getAreaOfCubes(numberOfCubes) {
  if (numberOfCubes === 0) return 0;
  return 10 + 4 * (numberOfCubes - 2);
}

function calculateSurfaceArea(items) {
  let area = 0;
  items.forEach((row, rowIdx) => {
    row.forEach((cubeCount, columnIdx) => {
      if (cubeCount !== 0) {
        area += getAreaOfCubes(cubeCount);

        if (rowIdx - 1 >= 0) {
          area = area - 2 * Math.min(cubeCount, items[rowIdx - 1][columnIdx]);
        }

        if (columnIdx - 1 >= 0) {
          area = area - 2 * Math.min(cubeCount, items[rowIdx][columnIdx - 1]);
        }
      }
    });
  });
  return area;
}

calculateSurfaceArea([
  [1, 3, 4],
  [2, 2, 3],
  [1, 2, 4],
]);
