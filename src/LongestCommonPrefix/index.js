// 3043 MEDIUM
/**
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @return {number}
 */
var longestCommonPrefix = function (arr1, arr2) {
  const trie = new Trie();
  for (const str of arr1) {
    trie.insert(str.toString())
  }
  let max = 0;
  for (const str of arr2) {
    max = Math.max(max, trie.countPrefix(str.toString()))
  }
  return max
};

class TrieNode {
  constructor() {
    this.children = {}; // To store the child nodes (key: character, value: TrieNode)
    this.isEndOfWord = false; // True if the node represents the end of a word
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode(); // The root of the trie
  }

  // Method to insert a word into the Trie
  insert(word) {
    let currentNode = this.root;

    for (let char of word) {
      // If the character is not present, add a new node
      if (!currentNode.children[char]) {
        currentNode.children[char] = new TrieNode();
      }
      currentNode = currentNode.children[char]; // Move to the next node
    }

    // After inserting all the characters, mark the end of the word
    currentNode.isEndOfWord = true;
  }

  // Method to search for a word in the Trie
  search(word) {
    let currentNode = this.root;

    for (let char of word) {
      // If the character is not found, return false
      if (!currentNode.children[char]) {
        return false;
      }
      currentNode = currentNode.children[char];
    }

    // Return true if the current node marks the end of the word
    return currentNode.isEndOfWord;
  }

  countPrefix(word) {
    let count = 0;
    let currentNode = this.root;

    for (let char of word) {
      // If the character is not found, return the count
      if (!currentNode.children[char]) {
        return count;
      }
      currentNode = currentNode.children[char];
      count++;
    }
    return count;
  }

  // Method to check if there is any word in the Trie that starts with the given prefix
  startsWith(prefix) {
    let currentNode = this.root;

    for (let char of prefix) {
      if (!currentNode.children[char]) {
        return false;
      }
      currentNode = currentNode.children[char];
    }

    return true; // Return true if the prefix exists
  }
}