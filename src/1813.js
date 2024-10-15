/**
 * @param {string} sentence1
 * @param {string} sentence2
 * @return {boolean}
 */
var areSentencesSimilar = function (sentence1, sentence2) {
  if (sentence1.length === sentence2.length) {
    return sentence1 === sentence2
  }
  const [smaller, larger] = (() => {
    const split1 = sentence1.split(' ')
    const split2 = sentence2.split(' ')
    if (split1.length > split2.length) return [split2, split1]
    return [split1, split2]
  })()

  for (let i = 0; i <= smaller.length; i++) {
    const prefix = smaller.slice(0, i)
    const suffix = smaller.slice(i, smaller.length)
    let isValid = true
    for (let j = 0; j < prefix.length; j++) {
      if (prefix[j] !== larger[j]) {
        isValid = false
        break
      }
    }
    if (isValid) {
      for (let j = 0; j < suffix.length; j++) {
        if (suffix[suffix.length - 1 - j] !== larger[larger.length - 1 - j]) {
          isValid = false
          break
        }
      }
    }
    if (isValid) {
      return true
    }
  }
  return false
};

console.log(areSentencesSimilar("B", "ByI BMyQIqce b bARkkMaABi vlR RLHhqjNzCN oXvyK zRXR q ff B yHS OD KkvJA P JdWksnH"))