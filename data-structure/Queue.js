
class Queue {
  data = []
  lastIndex = -1
  firstIndex = 0
  add(value) {
    this.lastIndex++
    this.data[this.lastIndex] = value
  }
  take() {
    if (this.firstIndex <= this.lastIndex) {
      const result = this.data[this.firstIndex]
      this.data[this.firstIndex] = undefined
      this.firstIndex++
      if (this.size() === 0) {
        this.firstIndex = 0;
        this.lastIndex = -1;
      }
      return result
    } else {
      return undefined;
    }
  }
  size() {
    return this.lastIndex - this.firstIndex + 1;
  }
  clear() {
    this.data.length = 0
    this.lastIndex = -1
    this.firstIndex = 0
  }
}
