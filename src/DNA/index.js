process.stdin.resume();
process.stdin.setEncoding('utf-8');

const fs = require('fs');
const readline = require('readline');

const rd = readline.createInterface({
  input: fs.createReadStream('./db'),
  crlfDelay: Infinity,
});

const trie = [
  {
    id: 0,
    value: '',
    failureLink: undefined,
    parent: undefined,
    child: [],
    health: [],
  },
];

function geneTree(genes, health) {
  for (let p = 0; p < genes.length; p++) {
    const gene = genes[p];
    const geneIdx = p;

    let curParent = 0;
    let isCreatedNewPath = false;
    for (let i = 0; i < gene.length; i++) {
      // only last element has health
      const tempHealth = i === gene.length - 1 ? health[geneIdx] : 0;

      const parentId = isCreatedNewPath
        ? undefined
        : trie[curParent].child.find(
            (nodeId) => trie[nodeId].value === gene[i]
          );
      // find a child available
      if (parentId) {
        // move cur parent to another parent
        curParent = parentId;
        if (tempHealth) {
          // for duplicated gene
          trie[parentId].health.push({
            value: tempHealth,
            idx: geneIdx,
          });
        }
      } else {
        // can not find any child
        const newNodeId = trie.length;
        trie.push({
          id: newNodeId,
          value: gene[i],
          failureLink: undefined,
          parent: curParent,
          child: [],
          health: [{ value: tempHealth, idx: geneIdx }],
        });
        trie[curParent].child.push(newNodeId);

        curParent = newNodeId;
        // add new node to the tree, all subsequences node will be added also
        isCreatedNewPath = true;
      }
    }
  }
}

function initFailureNodeLinkedToRoot() {
  for (let i = 0; i < trie[0].child.length; i++) {
    const node = trie[0].child[i];
    trie[node].failureLink = 0;
  }
}

function calculateFailureLink(nodeId) {
  if (nodeId === 0) {
    return;
  }

  const node = trie[nodeId];
  if (node.failureLink !== undefined) {
    return;
  }

  let curParentNodeId = node.parent;

  while (true) {
    curParentNodeId = trie[curParentNodeId].failureLink;

    if (curParentNodeId === undefined) {
      node.failureLink = 0;
      return;
    }

    const findNodeId = trie[curParentNodeId].child.find(
      (nodeId) => trie[nodeId].value === node.value
    );

    if (findNodeId !== undefined) {
      node.failureLink = findNodeId;
      return;
    }
  }
}

function BFSSearch() {
  // store id of node
  const queue = [0];
  let checkIndex = 0;
  while (checkIndex + 1 <= queue.length) {
    const checkNodeId = queue[checkIndex];
    // do something here
    calculateFailureLink(checkNodeId);

    // bfs search
    for (let i = 0; i < trie[checkNodeId].child.length; i++) {
      const node = trie[checkNodeId].child[i];
      queue.push(node);
    }
    checkIndex++;
  }
  trie[0].failureLink = undefined;
}

function calculateGeneHealth(first, last, dna) {
  let totalHealth = 0;
  let currentNodeIdx = 0;
  for (let i = 0; i < dna.length; i++) {
    let findNode = false;
    if (currentNodeIdx === undefined) {
      currentNodeIdx = 0;
    }
    do {
      const matchNodeIdx = trie[currentNodeIdx].child.find(
        (nodeId) => trie[nodeId].value === dna[i]
      );
      if (matchNodeIdx) {
        findNode = true;

        let failureChildNode = matchNodeIdx;
        while (failureChildNode !== undefined) {
          for (let j = 0; j < trie[failureChildNode].health.length; j++) {
            const item = trie[failureChildNode].health[j];
            if (item.idx >= first && item.idx <= last) {
              totalHealth += item.value;
            }
          }
          failureChildNode = trie[failureChildNode].failureLink;
        }
        currentNodeIdx = matchNodeIdx;
      } else {
        currentNodeIdx = trie[currentNodeIdx].failureLink;
      }
    } while (currentNodeIdx !== undefined && !findNode);
  }
  return totalHealth;
}

let idx = 0;
let genes;
let health;
let minHealth = Number.MAX_SAFE_INTEGER;
let maxHealth = -1;

function main() {
  rd.on('line', function (line) {
    switch (idx) {
      case 0:
        break;
      case 1:
        genes = line.replace(/\s+$/g, '').split(' ');
        break;
      case 2:
        health = line
          .replace(/\s+$/g, '')
          .split(' ')
          .map((healthTemp) => parseInt(healthTemp, 10));
        break;
      case 3: {
        geneTree(genes, health);
        initFailureNodeLinkedToRoot();
        BFSSearch();
        break;
      }
      default: {
        const tmpLine = line.split(' ');
        const first = parseInt(tmpLine[0], 10);

        const last = parseInt(tmpLine[1], 10);
        const geneHealth = calculateGeneHealth(first, last, d);
        if (geneHealth > maxHealth) {
          maxHealth = geneHealth;
        }
        if (geneHealth < minHealth) {
          minHealth = geneHealth;
        }
      }
    }
    idx++;
  });
}

main();
