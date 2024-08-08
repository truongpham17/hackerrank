/**
 * @param {number} n
 * @param {number[][]} pick
 * @return {number}
 */
var winningPlayerCount = function (n, pick) {


  class DefaultMap {
    map = new Map()
    set(key, value) {
      this.map.set(key, value)
    }
    get(key) {
      return this.map.get(key)
    }
    increase(key, value) {
      if (!this.map.has(key)) {
        this.map.set(key, value)
      } else {
        this.map.set(key, this.map.get(key) + value)
      }
    }
    delete(key) {
      this.map.delete(key)
    }
    size() {
      return this.map.size
    }
    toValueArray() {
      return [...this.map.values()]
    }
    toKeyArray() {
      return [...this.map.keys()]
    }
    toEntryArray() {
      return [...this.map.entries()]
    }
  }
  const map = new DefaultMap();
  const set = new Set()
  const toKey = (u, c) => `${u}_${c}`
  for (const [u, c] of pick) {
    map.increase(toKey(u, c), 1)
    if (map.get(toKey(u, c)) >= u + 1) {
      set.add(u)
    }
  }
  return set.size
};
console.log(winningPlayerCount(4,  [[1,1],[2,4],[2,4],[2,4]]))