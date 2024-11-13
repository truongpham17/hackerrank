const fs = require('fs');

// Read input from a file (example: 'input.txt')
const inputFile = 'input_2.txt';
const outputFile = 'output_2.txt';

// Read the file synchronously
const input = fs.readFileSync(inputFile, 'utf8');

// Split input into lines
const inputLines = input.trim().split('\n');

let index = 0;
const next = () => {
  if (index < inputLines.length) {
    const nextLine = inputLines[index]
    index++
    return nextLine
  }
  return undefined
}

// Utility function for parsing inputs
function getNextInput() {
  const [R, C] = next().split(' ').map(Number)
  const arr = []
  for (let i = 0; i < R; i++) {
    arr.push(next())
  }
  return arr
}

// Solution function
function solve() {
  const n = Number(next())

  const results = [];

  for (let i = 0; i < n; i++) {
    // read here
    const caseData = getNextInput()
    // Solve each test case and store the result
    results.push(`Case #${i + 1}: ${solveCase(caseData)}`);
  }

  // Write the results to output.txt
  fs.writeFileSync(outputFile, results.join('\n'));
}


// Function to solve an individual test case
function solveCase(arr) {
  const r = arr.length;
  const c = arr[0].length;

  const isInside = (x, y) => !(x < 0 || y < 0 || x >= r || y >= c)

  const visited = new Set()
  const space = new Map(); // store set of near space
  const neibor = new Map(); // store all adjent white
  const dfs = ([x, y], parent, queue) => {
    const coor = toCoord(x, y)
    neibor.get(parent).push(coor)
    for (const [delX, delY] of DIRECTION) {
      if (isInside(x + delX, y + delY)) {
        if (!visited.has(toCoord(x + delX, y + delY)) && arr[x + delX][y + delY] === 'W') {
          visited.add(toCoord(x + delX, y + delY))
          queue.add([x + delX, y + delY])
        }
        if (arr[x + delX][y + delY] === '.') {
          space.get(parent).add(toCoord(x + delX, y + delY))
        }
      }
    }
  }

  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      const coor = toCoord(i, j)
      if (arr[i][j] === 'W' && !visited.has(coor)) {
        space.set(coor, new Set())
        neibor.set(coor, [])
        const queue = new Queue()
        queue.add([i, j])
        visited.add(coor)
        while (queue.size() !== 0) {
          const x = queue.take();
          dfs(x, coor, queue)
        }
      }
    }
  }
  // get all possible space
  const goodSpace = {}
  for (const key of space.keys()) {
    if (space.get(key).size === 1) {
      const thatSpace = [...space.get(key)]
      if (!goodSpace[thatSpace]) {
        goodSpace[thatSpace] = 0
      }
      goodSpace[thatSpace] += neibor.get(key).length
    }
  }

  return Math.max(...Object.values(goodSpace), 0)
}

class Queue {
  data = [];
  lastIndex = -1;
  firstIndex = 0;

  add(value) {
    this.lastIndex++;
    this.data[this.lastIndex] = value;
  }

  take() {
    if (this.firstIndex <= this.lastIndex) {
      const result = this.data[this.firstIndex];
      this.data[this.firstIndex] = undefined;
      this.firstIndex++;
      if (this.size() === 0) {
        this.firstIndex = 0;
        this.lastIndex = -1;
      }
      return result;
    } else {
      return undefined;
    }
  }

  size() {
    return this.lastIndex - this.firstIndex + 1;
  }

  clear() {
    this.data.length = 0;
    this.lastIndex = -1;
    this.firstIndex = 0;
  }
}

// utils
const toCoord = (x, y) => x * (3002) + y
const DIRECTION = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0]
]

// Run the solution
solve();
