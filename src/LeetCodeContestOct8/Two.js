/**
 * @param {number[]} processorTime
 * @param {number[]} tasks
 * @return {number}
 */
var minProcessingTime = function (processorTime, tasks) {
  processorTime.sort((a, b) => a - b);
  tasks.sort((a, b) => a - b);
  let min = Number.MAX_SAFE_INTEGER;
  for (let i = 0; i < processorTime.length; i++) {
    const process = processorTime[i];
    for (let j = i * 4; j < i * 4 + 4; j++) {
      if (tasks[j] - process[i] < min) {
        min = tasks[j] - process[i];
      }
    }
  }
  return min;
};
