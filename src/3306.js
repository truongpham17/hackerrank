/**
 * @param {string} word
 * @param {number} k
 * @return {number}
 */
var countOfSubstrings = function (word, k) {
  const vowels = ['a', 'e', 'i', 'o', 'u']
  const mapCount = {}
  for (const v of vowels) {
    mapCount[v] = 0
  }

  let rs = 0;
  let breakPoint = -1;

  const isFullVowel = () => {
    return Object.values(mapCount).filter(x => x >= 1).length === vowels.length
  }

  let l = -1;
  let cons = 0;

  for (let r = 0; r < word.length; r++) {
    if (!vowels.includes(word[r])) {
      cons++
    } else {
      mapCount[word[r]]++
    }
    
    if (isFullVowel() && cons >= k) {
      while (l < r) {
        l++
        if (!vowels.includes(word[l])) {
          if (cons > k) {
            cons--
            breakPoint = l;
          } else {
            l--
            break;
          }
        } else {
          if (mapCount[word[l]] > 1) {
            mapCount[word[l]]--
          } else {
            l--
            break
          }
        }
      }
    }

    if (cons === k && isFullVowel()) {
      // starting from l+1 to breakPoint + 1
      rs += l + 1 - breakPoint
    }
  }
  return rs
};
console.log(countOfSubstrings('iebufaoioe', 2))