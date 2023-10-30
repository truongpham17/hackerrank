// source: https://leetcode.com/problems/statistics-from-a-large-sample/
/**
 * @param {number[]} data
 * @return {number[]}
 */

var sampleStats = function (data) {
  const array = [null, null, 0, null, null];
  const newData = [];
  let maxRepCount = -1;
  let totalCount = 0;
  let sumVal = 0;
  data.forEach((repCount, value) => {
    if (repCount > 0) {
      if (repCount > maxRepCount) {
        maxRepCount = repCount;
        array[4] = value;
      }
      totalCount += repCount;
      newData.push({ value, totalCount });
      sumVal += repCount * value;
    }
  });
  const meanIndex = (totalCount + 1) / 2;
  const lowerMeanIndex = Math.floor(meanIndex);
  const higherMeanIndex = Math.ceil(meanIndex);
  for (let i = 0; i < newData.length; i++) {
    const { value, totalCount } = newData[i];
    if (totalCount >= lowerMeanIndex) {
      if (array[3] === null) {
        array[3] += value;
      }
    }
    if (totalCount >= higherMeanIndex) {
      array[3] += value;
      break;
    }
  }
  array[3] /= 2;
  array[0] = newData[0].value;
  array[1] = newData[newData.length - 1].value;
  array[2] = sumVal / totalCount;
  return array;
};

// [minimum, maximum, mean, median, mode]
