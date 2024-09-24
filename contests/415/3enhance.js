/**
 * @param {string[]} words
 * @param {string} target
 * @return {number}
 */
var minValidStrings = function (words, target) {
  const INF = 10 ** 10
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

    travel(str, index) {
      let curIndex = index
      let tempNode = this.root
      while (tempNode.children[str[curIndex]]) {
        tempNode = tempNode.children[str[curIndex]]
        curIndex++
      }
      return curIndex === index ? -1 : curIndex - 1
    }
  }

  class SegmentTree {
    constructor(n) {
      this.n = n
      this.tree = new Array(4 * this.n).fill(INF); // Segment tree storage
      this.lazy = new Array(4 * this.n).fill(INF); // Lazy propagation storage
    }

    // Lazy propagation to apply pending updates
    propagate(node, start, end) {
      if (this.lazy[node] !== INF) {
        // Update the current node with the lazy value
        this.tree[node] = Math.min(this.tree[node], this.lazy[node]);

        if (start !== end) {
          // Propagate the lazy value to children
          const leftChild = 2 * node + 1;
          const rightChild = 2 * node + 2;

          this.lazy[leftChild] = Math.min(this.lazy[leftChild], this.lazy[node]);
          this.lazy[rightChild] = Math.min(this.lazy[rightChild], this.lazy[node]);
        }

        // Clear the lazy value after propagation
        this.lazy[node] = INF;
      }
    }

    // Range update: update range [l, r] to min(nodeValue, x)
    updateRange(l, r, x, node = 0, start = 0, end = this.n - 1) {
      this.propagate(node, start, end);

      if (start > r || end < l) {
        // No overlap
        return;
      }

      if (start >= l && end <= r) {
        // Full overlap, apply the lazy update
        this.lazy[node] = Math.min(this.lazy[node], x);
        this.propagate(node, start, end);
        return;
      }

      // Partial overlap, update both children
      const mid = Math.floor((start + end) / 2);
      const leftChild = 2 * node + 1;
      const rightChild = 2 * node + 2;

      this.updateRange(l, r, x, leftChild, start, mid);
      this.updateRange(l, r, x, rightChild, mid + 1, end);

      // After updating children, recalculate the current node's value
      this.tree[node] = Math.min(this.tree[leftChild], this.tree[rightChild]);
    }

    // Query the minimum value in range [l, r]
    queryRange(l, r, node = 0, start = 0, end = this.n - 1) {
      this.propagate(node, start, end);

      if (start > r || end < l) {
        // No overlap
        return INF;
      }

      if (start >= l && end <= r) {
        // Full overlap
        return this.tree[node];
      }

      // Partial overlap
      const mid = Math.floor((start + end) / 2);
      const leftChild = 2 * node + 1;
      const rightChild = 2 * node + 2;

      const leftQuery = this.queryRange(l, r, leftChild, start, mid);
      const rightQuery = this.queryRange(l, r, rightChild, mid + 1, end);

      return Math.min(leftQuery, rightQuery);
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
  const segmentTree = new SegmentTree(target.length)

  const rs = []
  if (trie.root.children[target[0]]) {
    rs.push([1, INF])
    const matchEndPos = trie.travel(target, 0)
    segmentTree.updateRange(0, matchEndPos, 1)
  } else {
    return -1
  }

  for (let i = 1; i < target.length; i++) {
    rs.push([INF, INF])
    const cur = rs[i]

    if (trie.root.children[target[i]]) {
      cur[0] = Math.min(rs[i - 1][0], rs[i - 1][1]) + 1
      const matchEndPos = trie.travel(target, i)
      segmentTree.updateRange(i, matchEndPos, cur[0])
    }

    cur[1] = Math.min(cur[1], segmentTree.queryRange(i, i))
  }

  const minResult = Math.min(rs[rs.length - 1][0], rs[rs.length - 1][1])
  return minResult === INF ? -1 : minResult
};

console.log(minValidStrings(["abc", "aaaaa", "bcdef"], "aabcdabc"))
console.log(minValidStrings(["caacbbbbbcaccbcbcccbcbbbcbcabbcaaacabbcbbccabcac", "baccccb", "aacabcca"], "aacaacbabb"))
console.log(minValidStrings(["ccbdbccddecbe", "ebcabbadaccbaebbdbcdeacedddcedecbdde", "dcddbbcabbb", "dbecbadbcdebdcbbeccceacecedaadecadeeceddcaceaeacbdedcdaaacbbacbdcadcdeeabbdadbeeeaebcdedeccddabbcccbeccaeedcadbbdcecc", "d", "acbabcdebaee", "beccdcaccbdeaadb", "aecbdbeedbb"], "debccbaeebaedbaaeaeeeeade"))