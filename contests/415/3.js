/**
 * @param {string[]} words
 * @param {string} target
 * @return {number}
 */
var minValidStrings = function (words, target) {
  // Define the TrieNode class
  class TrieNode {
    constructor() {
      this.children = {}; // Object to store children nodes
      this.isEndOfWord = false; // Marks the end of a word
    }
  }

  // Define the Trie class
  class Trie {
    constructor() {
      this.root = new TrieNode(); // Initialize the root node
    }

    // Method to insert a word into the Trie
    insert(word) {
      let currentNode = this.root;

      for (let char of word) {
        if (!currentNode.children[char]) {
          currentNode.children[char] = new TrieNode(); // Create a new node if not exists
        }
        currentNode = currentNode.children[char]; // Move to the next node
      }

      currentNode.isEndOfWord = true; // Mark the end of the word
    }
  }

  // Function to build the Trie from an array of strings
  function buildTrie(words) {
    const trie = new Trie();
    for (let word of words) {
      trie.insert(word); // Insert each word into the Trie
    }
    return trie;
  }
  const trie = buildTrie(words)
  let rs = 10 ** 10

  const travel = (targetIndex, prevCount) => {
    let curIndex = targetIndex
    let node = trie.root
    while (node && curIndex < target.length) {
      if (node.children[target[curIndex]]) {
        if (curIndex === target.length - 1) {
          rs = Math.min(rs, prevCount + 1)
        }
        node = node.children[target[curIndex]]
        curIndex++
        if (curIndex < target.length) {
          travel(curIndex, prevCount + 1)
        }
      } else {
        break
      }
    }

    if (curIndex !== targetIndex) {
      travel(curIndex, prevCount + 1)
    }
  }

  travel(0, 0)

  return rs === 10 ** 10 ? -1 : rs
};
console.log(minValidStrings(["abc", "aaaaa", "bcdef"], "aabcdabc"))
console.log(minValidStrings(["caacbbbbbcaccbcbcccbcbbbcbcabbcaaacabbcbbccabcac", "baccccb", "aacabcca"], "aacaacbabb"))
console.log(minValidStrings(["ccbdbccddecbe", "ebcabbadaccbaebbdbcdeacedddcedecbdde", "dcddbbcabbb", "dbecbadbcdebdcbbeccceacecedaadecadeeceddcaceaeacbdedcdaaacbbacbdcadcdeeabbdadbeeeaebcdedeccddabbcccbeccaeedcadbbdcecc", "d", "acbabcdebaee", "beccdcaccbdeaadb", "aecbdbeedbb"], "debccbaeebaedbaaeaeeeeade"))