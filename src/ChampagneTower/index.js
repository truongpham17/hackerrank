// Difficulty level: MEDIUM
// source: https://leetcode.com/problems/champagne-tower/?envType=daily-question&envId=2023-09-24

/**
 * @param {number} poured
 * @param {number} query_row
 * @param {number} query_glass
 * @return {number}
 */
var champagneTower = function (poured, query_row, query_glass) {
  let wineLeft = poured;
  let curIndex = 0;
  const pourValue = new Map();
  let savedI = 0;
  let saveWine = 0;
  while (wineLeft - saveWine > 0) {
    const [i, j] = getCoordFromIndex(curIndex);
    if (i !== savedI) {
      savedI = i;
      wineLeft -= saveWine;
      saveWine = 0;
    }
    let multipleIndex = curIndex === 0 ? 1 : 0;
    const parents = getParents(i, j);
    parents.forEach(([pi, pj]) => {
      const index = getIndexFromCoords(pi, pj);
      if (pourValue.get(index) === 1) {
        multipleIndex += 1 / (i * 2);
      }
    });
    pourValue.set(curIndex, Math.min(1, wineLeft * multipleIndex));

    if (multipleIndex > 0) {
      saveWine += pourValue.get(curIndex);
    }
    if (i === query_row && j === query_glass) {
      console.log(pourValue);
      return pourValue.get(curIndex);
    }
    curIndex++;
  }
  return 0;
};

const getCoordFromIndex = (index) => {
  const i = Math.floor((-1 + Math.sqrt(1 + 8 * index)) / 2);
  const j = index - (i * (i + 1)) / 2;
  return [i, j];
};

const getIndexFromCoords = (i, j) => (i * (i + 1)) / 2 + j;

const getParents = (i, j) => {
  const parents = [];
  if (i > 0) {
    if (j > 0) parents.push([i - 1, j - 1]);
    if (j < i) parents.push([i - 1, j]);
  }
  return parents;
};

console.log(champagneTower(24, 6, 6));
