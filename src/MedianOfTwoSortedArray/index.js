// Difficulty level: HARD
// source: https://leetcode.com/problems/median-of-two-sorted-arrays/

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
console.log(findMinEqualOrSmaller(8, [1, 2, 3, 5, 7], 0, 4));

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
  //---------------------------------//
  // for separated array
  function seperatedArray(arr1, arr2) {
    const n1 = arr1.length;
    const n2 = arr2.length;
    const sum = n1 + n2;
    if (arr1[n1 - 1] < arr2[0]) {
      const [median_1, median_2] = getMedianIndexes(sum);
      const leftValue = median_1 >= n1 ? arr2[median_1 - n1] : arr1[median_1];
      if (median_2 === undefined) return leftValue;
      const rightValue = median_2 >= n1 ? arr2[median_2 - n1] : arr1[median_2];
      return (leftValue + rightValue) / 2;
    }
    return null;
  }

  const value_1 = seperatedArray(nums1, nums2);
  if (value_1 !== null) return value_1;
  const value_2 = seperatedArray(nums2, nums1);
  if (value_2 !== null) return value_2;
  //---------------------------------//
  // for normal cases
  const maxStart = Math.max(nums1[0], nums2[0]);
  const minEnd = Math.min(nums1[nums1.length - 1], nums2[nums2.length - 1]);

  let x1, y1, x2, y2;
  if (maxStart === nums1[0]) {
    x1 = 0;
    x2 = findMinEqualOrLarger(maxStart, nums2, 0, nums2.length - 1);
  } else {
    x2 = 0;
    x1 = findMinEqualOrLarger(maxStart, nums1, 0, nums1.length - 1);
  }

  if (minEnd === nums1[nums1.length - 1]) {
    y1 = nums1.length - 1;
    y2 = findMinEqualOrSmaller(minEnd, nums2, 0, nums2.length - 1);
  } else {
    y2 = nums2.length - 1;
    y1 = findMinEqualOrSmaller(minEnd, nums1, 0, nums1.length - 1);
  }

  // from x1 -> y1, x2 -> y2
  const totalIntersection = y1 - x1 + y2 - x2 + 2;
  const totalLength = nums1.length + nums2.length;
  const leftPart = x1 + x2 - 2;
  const rightPart = totalLength - y1 - y2;

  function findValueFromIndexInMergedArr(index) {
    // for left part
    if (index <= leftPart) {
      if (x1 < x2) {
        return nums2[index];
      } else {
        return nums1[index];
      }
    }
    // for right part
    if (index > totalLength - rightPart) {
      if (y2 > y1) {
        return nums2[y2 + index + rightPart - totalLength];
      } else {
        return nums1[y1 + index + rightPart - totalLength];
      }
    }
    // for middle, find mid value, get x & y, if x + y < index, increase mid
  }
};

// console.log(findMedianSortedArrays([], [1, 3, 5]));
