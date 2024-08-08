/**
 * @param {number[][]} customers
 * @return {number}
 */
var averageWaitingTime = function (customers) {
  let curTime = 0;
  let totalTime = 0;
  for (const [start, time] of customers) {
    totalTime = (curTime + time) - start;
    curTime = Math.max(curTime, start) + time
  }
  return totalTime / customers.length
};