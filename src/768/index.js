/**
 * @param {number[]} arr
 * @return {number}
 */
var maxChunksToSorted = function (arr) {
  const sort = [...arr].sort((a, b) => a - b)
  const map = {}
  for (let i = 0; i < sort.length; i++) {
    if (!map[sort[i]]) {
      map[sort[i]] = []
    }
    map[sort[i]].push(i)
  }
  let pivot = 0 ;
  let move = 0;
  let rs = 0
  while(move < sort.length) {
    let count = -1;
    while(count === move - pivot) {
      
    }
  }
};