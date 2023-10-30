function getSpreadValues(arr, d) {
  const spreadValues = [];
  for (let i = 0; i < arr.length; i++) {
    let tempValue = arr[i];
    spreadValues.push([tempValue]);
    while (tempValue > 0) {
      tempValue = Math.floor(tempValue / d);
      spreadValues[i].push(tempValue);
    }
    spreadValues[i].reverse();
  }
  return spreadValues;
}

function getMaxIdxInArray(arr) {
  let idx = 0;
  arr.forEach((item, index) => {
    if (item > arr[idx]) idx = index;
  });
  return idx;
}

function getTotalStepDivide(value, d) {
  let count = 0;
  let tempValue = value;
  while (tempValue > 0) {
    tempValue = Math.floor(tempValue / d);
    count++;
  }
  return count + 1;
}

function getDuplicateCount(arr) {
  let maxDuplicate = 0;
  let tempMaxValue = -1;
  let tempD = 1;
  let tempValue = arr[0];
  arr.forEach((item, idx) => {
    if (idx !== 0) {
      if (item === tempValue) {
        tempD++;
      } else {
        if (tempD > maxDuplicate) {
          maxDuplicate = tempD;
          tempMaxValue = tempValue;
        }
        tempD = 1;
        tempValue = item;
      }
    }
  });

  if (tempD > maxDuplicate) {
    maxDuplicate = tempD;
    tempMaxValue = tempValue;
  }

  return [tempMaxValue, maxDuplicate];
}

function minOperations(arr, threshold, d) {
  // Write your code here
  const sortedArr = arr.sort();
  const spreadValues = getSpreadValues(sortedArr, d);
  const maxSteps = getTotalStepDivide(arr[getMaxIdxInArray(arr)], d);

  for (let i = maxSteps - 1; i >= 0; i--) {
    const values = [];
    for (let j = 0; j < arr.length; j++) {
      if (spreadValues[j][i] !== undefined) {
        values.push(spreadValues[j][i]);
      }
    }
    const [maxValue, duplicate] = getDuplicateCount(values);
    if (duplicate >= threshold) {
      const selectedArr = spreadValues
        .filter((item) => item[i] === maxValue)
        .map((item) => item.length - 1 - i)
        .sort();
      const removeDupArr = selectedArr.slice(0, threshold);
      return removeDupArr.reduce((a, b) => a + b, 0);
    }
  }
  return -1;
}
console.log(minOperations([4, 8], 2, 2));
