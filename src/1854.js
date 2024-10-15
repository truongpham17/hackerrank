/**
 * @param {number[][]} logs
 * @return {number}
 */
var maximumPopulation = function (logs) {
  const bucket = Array(100).fill(0)
  for (const [born, dead] of logs) {
    
    bucket[born - 1950]++
    bucket[dead - 1950]--
  }
  let max = 0
  let maxKey = -1
  let count = 0;

  for (let i = 0; i < 100; i++) {
    count += bucket[i]
    if (count > max) {
      max = count
      maxKey = i
    }
  }
  return maxKey + 1950

};

// way 2
/**
 * @param {number[][]} logs
 * @return {number}
 */
var maximumPopulation = function (logs) {
  let count = 0;
  const obj = {}
  const initValue = key => {
    if (obj[key] === undefined) {
      obj[key] = 0
    }
  }
  for (const [born, dead] of logs) {
    initValue(born)
    initValue(dead)
    obj[born]++
    obj[dead]--
  }
  const keys = Object.keys(obj)
  keys.sort((a, b) => a - b)
  let max = 0
  let maxKey = -1
  for (const key of keys) {
    count += obj[key]
    if (count > max) {
      maxKey = key
      max = count
    }
  }
  return Number(maxKey)
};