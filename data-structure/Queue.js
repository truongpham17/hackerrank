
class Queue {
  data = new Map()
  lastIndex = -1
  firstIndex = 0
  add(value) {
    this.lastIndex++
    this.data.set(this.lastIndex, value)
  }
  take() {
    if (this.firstIndex <= this.lastIndex) {
      const result = this.data.get(this.firstIndex);
      this.data.delete(this.firstIndex)
      this.firstIndex++
      return result
    } else {
      return undefined;
    }
  }
  size() {
    return this.lastIndex - this.firstIndex + 1;
  }
  clear() {
    this.data.clear()
    this.lastIndex = -1
    this.firstIndex = 0
  }
}