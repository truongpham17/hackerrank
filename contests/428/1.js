/**
 * @param {number[][]} events
 * @return {number}
 */
var buttonWithLongestTime = function (events) {
  let minIndex = events[0][0]
  let max = events[0][1]
  for (let i = 1; i < events.length; i++) {
    const time = events[i][1] - events[i - 1][1]
    if (time === max) {
      const index = events[i][0]
      if (index < minIndex) {
        minIndex = index
      }
    } else if (time > max) {
      max = time
      minIndex = events[i][0]
    }
  }
  return minIndex

};
console.log(buttonWithLongestTime([[1, 2], [2, 5], [0, 10], [1, 15]]))