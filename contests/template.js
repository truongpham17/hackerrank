const min = (...args) => {
  return Math.min(...args)
}
const max = (...args) => {
  return Math.max(...args)
}
const ceil = value => Math.ceil(value)
const floor = value => Math.floor(value)
const abs = value => Math.abs(value)

const toSort = (arr) => arr.sort((a, b) => a - b)
const toSortDesc = arr => arr.sort((b, a) => b - a)
const toSortProp = (arr, propName) => arr.sort((a, b) => a[propName] - b[propName])
const toSortDescProp = (arr, propName) => arr.sort((b, a) => b[propName] - a[propName])


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


console.log(min(1, 2, 3, -1))