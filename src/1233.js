/**
 * @param {string[]} folder
 * @return {string[]}
 */
var removeSubfolders = function (folder) {
  const trie = new Trie();
  for (const f of folder) {
    const split = f.split('/')
    trie.insert(split)
  }

  const rs = []
  trie.travel(rs, '', trie.root)
  return rs
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
      if (!char) continue
      // If the character is not present, add a new node
      if (!currentNode.children[char]) {
        currentNode.children[char] = new TrieNode();
      } else if (currentNode.children[char].isEndOfWord) {
        currentNode.children[char].children = {}
        return;
      }
      currentNode = currentNode.children[char]; // Move to the next node
    }
    // After inserting all the characters, mark the end of the word
    currentNode.isEndOfWord = true;
  }
  travel(arr, curStr, curNode) {
    for (const c of Object.keys(curNode.children)) {
      if (curNode.children[c].isEndOfWord) {
        arr.push(curStr + '/' + c)
      } else {
        this.travel(arr, curStr + '/' + c, curNode.children[c])
      }
    }
  }
}
console.log(removeSubfolders(["/a", "/a/b", "/c/d", "/c/d/e", "/c/fe"]))