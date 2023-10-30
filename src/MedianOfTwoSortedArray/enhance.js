/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function (nums1, nums2) {
  const getMedianIndexes = (arrayLength) => {
    if (arrayLength % 2 === 0) {
      return [
        Math.floor((arrayLength - 1) / 2),
        Math.ceil((arrayLength - 1) / 2),
      ];
    }
    return [(arrayLength - 1) / 2];
  };

  const getMedianValues = (indexes, array) => {
    if (indexes.length === 1) return array[indexes[0]];
    return (array[indexes[0]] + array[indexes[1]]) / 2;
  };

  // for case m = 0 || n = 0
  if (nums1.length === 0) {
    return getMedianValues(getMedianIndexes(nums2.length), nums2);
  }
  if (nums2.length === 0) {
    return getMedianValues(getMedianIndexes(nums1.length), nums1);
  }

  let min = Math.min(nums1[0], nums2[0]);
  let max = Math.max(nums1[nums1.length - 1], nums2[nums2.length - 1]);
  const [middle_1, middle_2] = getMedianIndexes(nums1.length + nums2.length);
  function findValue(minValue, maxValue, expectedIndex) {
    const middle = Math.floor((minValue + maxValue) / 2);
  }
};

function findMinEqualOrSmaller(value, array, minIndex, maxIndex) {
  const curIndex = Math.floor((minIndex + maxIndex) / 2);
  if (
    array[curIndex] <= value &&
    (curIndex + 1 >= array.length || array[curIndex + 1] > value)
  ) {
    return curIndex;
  }
  if (minIndex >= maxIndex) return -1;
  if (array[curIndex] > value) {
    return findMinEqualOrSmaller(value, array, minIndex, curIndex);
  } else {
    return findMinEqualOrSmaller(value, array, curIndex + 1, maxIndex);
  }
}

function findMinEqualOrLarger(value, array, minIndex, maxIndex) {
  const curIndex = Math.floor((minIndex + maxIndex) / 2);
  if (
    array[curIndex] >= value &&
    (curIndex - 1 < 0 || array[curIndex - 1] < value)
  )
    return curIndex;
  if (minIndex >= maxIndex) return -1;
  if (array[curIndex] >= value) {
    return findMinEqualOrLarger(value, array, minIndex, curIndex);
  } else {
    return findMinEqualOrLarger(value, array, curIndex + 1, maxIndex);
  }
}

console.log(findMinEqualOrSmaller(4, [1, 3, 3, 3, 5], 0, 4));
console.log(findMinEqualOrLarger(3, [1, 3, 3, 3, 5], 0, 4));
