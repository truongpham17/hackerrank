/**
 * @param {number} numBottles
 * @param {number} numExchange
 * @return {number}
 */
var numWaterBottles = function (numBottles, numExchange) {
  let result = 0
  let full = numBottles
  let empty = 0
  while (full > 0) {
    result += rest;
    empty += full % numExchange
    full = Math.floor(full / numExchange)
    if (empty > numExchange) {
      full += Math.floor(empty / numExchange)
      empty = empty % numExchange
    }

  }
  return result
};