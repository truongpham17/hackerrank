// MEDIUM

var MyCalendarTwo = function () {
  this.map = new Map();
};

/** 
 * @param {number} start 
 * @param {number} end
 * @return {boolean}
 */
MyCalendarTwo.prototype.book = function (start, end) {
  const init = (value) => {
    if (!this.map.has(value)) {
      this.map.set(value, 0)
    }
  }

  const cleanup = () => {
    if (!this.map.get(start)) {
      this.map.delete(start)
    }
    if (!this.map.get(end)) {
      this.map.delete(end)
    }
  }
  init(start)
  init(end)
  this.map.set(start, this.map.get(start) + 1)
  this.map.set(end, this.map.get(end) - 1)
  let count = 0;
  const keys = [...this.map.keys()];
  keys.sort((a, b) => a - b)
  for (const key of keys) {
    count += this.map.get(key)
    if (count >= 3) {
      this.map.set(start, this.map.get(start) - 1)
      this.map.set(end, this.map.get(end) + 1)
      cleanup()
      return false
    }
  }
  cleanup()
  return true
};
