/**
 * @param {number[]} nums
 * @param {number[][]} queries
 * @return {number[]}
 */
var countOfPeaks = function (nums, queries) {
  const buildString = [];// false down, undefined none, true up
  for (let i = 0; i < nums.length - 1; i++) {
    buildString.push(getComparision(nums[i - 1], nums[i]))
  }
  const count = [];
  count.push(0);
  for (let i = 0; i < buildString.length; i++) {
    if (buildString[i] === true && buildString[i + 1] === false) {
      count.push({ key: i, value: 1 })
    }
  }

  const getComparision = (prev, cur) => {
    if (cur > prev) {
      return true;
    } else if (cur < prev) {
      return false;
    } else {
      return undefined
    }
  }


  const change = (value, index) => {
    queries[index] = value;
    if (index > 0) {
      let result = getComparision(queries[index - 1], queries[index]);
      if (buildString[index - 1] !== result) {
        const prevBuild = buildString[index - 1];
        buildString[index - 1] = result;

        // update count +- => ++
        if (prevBuild === false && buildString?.[index - 2] === true && result === true) {
          const updateKey = searchKey(index - 1);
          if (updateKey) {
            updateKey.value = 0;
          }
          // ++ -> +-
        } else if (prevBuild === true && buildString?.[index - 2] === true  && result === false) {
          const updateKey = searchKey(index - 1) ;
          if(updateKey) {
            updateKey.value = 1;
          } else {
            // add key to the array
          }
        }
      }
    }

    if (index < buildString.length - 1) {
      let result = getComparision(queries[index], queries[index + 1]);
      if (buildString[index + 1] !== result) {
        buildString[index + 1] = result
      }
    }
  }

  const searchKey = (key) => {
    let low = 0;
    let high = count.length - 1;
    let result = null; // Initialize result to -1, indicating no valid element found initially

    while (low <= high) {
      let mid = Math.floor((low + high) / 2);

      if (count[mid].key <= key) {
        if (count[mid] === key) {
          return count[mid]
        }
        result = count[mid]; // Potential answer found
        low = mid + 1;     // Search in the right half for a larger element that is still <= target
      } else {
        high = mid - 1;    // Search in the left half for smaller elements
      }
    }
    return result;
  }
};

