// source: https://leetcode.com/problems/reorganize-string/
/**
 * @param {string} s
 * @return {string}
 */
var reorganizeString = function (s) {
  const heap = [];
  let curChar = '';
  const getParent = (index) => {
    return Math.floor((index - 1) / 2);
  };
  const swapHeap = (i, j) => {
    [heap[i], heap[j]] = [heap[j], heap[i]];
  };

  const addHeap = (data) => {
    heap.push(data);
    let curPos = heap.length - 1;
    while (
      getParent(curPos) >= 0 &&
      heap[curPos].value > heap[getParent(curPos)].value
    ) {
      swapHeap(curPos, getParent(curPos));
      curPos = getParent(curPos);
    }
  };

  const bubbleDownHeap = (pos) => {
    let temp = pos;
    if (
      pos * 2 + 1 < heap.length &&
      heap[pos * 2 + 1].value > heap[temp].value
    ) {
      temp = pos * 2 + 1;
    }
    if (
      pos * 2 + 2 < heap.length &&
      heap[pos * 2 + 2].value > heap[temp].value
    ) {
      temp = pos * 2 + 2;
    }
    if (temp !== pos) {
      swapHeap(pos, temp);
      bubbleDownHeap(temp);
    }
  };

  const getPrioritizeString = () => {
    let value = '';

    const getIndex = () => {
      if (heap.length === 0) return -1;
      if (heap[0].key !== curChar) return 0;
      let temp = -1;
      if (heap.length > 1) {
        if (heap[1].key !== curChar && heap[1].value > 0) {
          temp = 1;
        }
      }
      if (heap.length > 2) {
        if (heap[2].key !== curChar && heap[2].value > 0) {
          if (temp === 1) {
            if (heap[2].value > heap[temp].value) temp = 2;
          } else {
            temp = 2;
          }
        }
      }

      return temp;
    };

    const index = getIndex();

    if (index !== -1 && heap[index].value > 0) {
      heap[index].value--;
      value = heap[index].key;
      bubbleDownHeap(index);
    }
    return value;
  };

  const map = new Map();
  for (let i = 0; i < s.length; i++) {
    if (map.has(s[i])) {
      map.set(s[i], map.get(s[i]) + 1);
    } else {
      map.set(s[i], 1);
    }
  }
  for (let [key, value] of map.entries()) {
    addHeap({ key, value });
  }
  let finalString = '';
  let priorityChar = getPrioritizeString();
  while (priorityChar !== '') {
    finalString += priorityChar;
    curChar = priorityChar;
    priorityChar = getPrioritizeString();
  }
  if (finalString.length === s.length) return finalString;
  return '';
};

console.log(reorganizeString('vvvlo'));
