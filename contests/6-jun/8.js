/**
 * @param {string} target
 * @param {string[]} words
 * @param {number[]} costs
 * @return {number}
 */
var minimumCost = function (target, words, costs) {
  class TrieNode {
    constructor() {
      this.children = {};
      this.isEndOfWord = false;
      this.cost = 0;
    }
  }

  class Trie {
    constructor() {
      this.root = new TrieNode();
    }

    insert(word, cost) {
      let node = this.root;
      for (const char of word) {
        if (!node.children[char]) {
          node.children[char] = new TrieNode();
        }
        node = node.children[char];
      }
      node.isEndOfWord = true;
      node.cost = Math.min(node.cost || 10 ** 10, cost)
    }

    insertArray(words, costs) {
      for (let i = 0; i < words.length; i++) {
        this.insert(words[i], costs[i]);

      }
    }

    search(word) {
      let node = this.root;
      for (const char of word) {
        if (!node.children[char]) {
          return false;
        }
        node = node.children[char];
      }
      return node.isEndOfWord;
    }

    travel(compare) {
      const result = [];
      let comIndex = 0;
      let node = this.root;
      while (comIndex < compare.length) {
        if (node.children[compare[comIndex]]) {
          node = node.children[compare[comIndex]];
          if (node.isEndOfWord) {
            result.push([comIndex, node.cost])
          }
          comIndex++
        } else {
          break
        }
      }
      return result
    }
  }
  const trie = new Trie();
  trie.insertArray(words, costs);
  const endHash = Array(target.length).fill(10 ** 10);
  for (let i = 0; i < target.length; i++) {
    const prevCost = i > 0 ? endHash[i - 1] : 0
    let searchText = target.slice(i)
    const nexts = trie.travel(searchText);
    for (const [pos, cost] of nexts) {
      if (endHash[pos + i] > cost + prevCost) {
        endHash[pos + i] = cost + prevCost
      }
    }
  }
  return endHash[target.length - 1] < 10 ** 10 ? endHash[target.length - 1] : -1
};
console.log(minimumCost("r", ["r", "r", "r", "r"], [1, 6, 3, 3]))