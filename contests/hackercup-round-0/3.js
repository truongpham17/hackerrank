const fs = require('fs');

// Read input from a file (example: 'input.txt')
const inputFile = 'input_3.txt';
const outputFile = 'output_3.txt';

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
  const N = Number(next())
  const ants = []
  for (let i = 0; i < N; i++) {
    ants.push(next().split(' ').map(Number))
  }
  return ants
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
function solveCase(ants) {
  let max = 2
  const set = new Set();
  const n = ants.length
  const pickRandom = () => {
    const a = Math.floor(Math.random() * n)
    const b = Math.floor(Math.random() * n)
    if (a !== b && !set.has(`${a}_${b}`)) {
      set.add(`${a}_${b}`)
      return [a, b]
    } else {
      return null
    }
  }
  for (let i = 0; i < 100; i++) {
    let pair = null
    let count = 100
    while (!pair && count > 0) {
      pair = pickRandom()
      count--
      if (count <= 0) break
    }
    if (!pair) break;
    const [ant_1, ant_2] = pair;
    let rs = 2;
    for (let i = 0; i < n; i++) {
      if (i !== ant_1 && i !== ant_2) {
        if (isInSameLine(ants[ant_1], ants[ant_2], ants[i])) {
          rs++
        }
      }
    }
    max = Math.max(rs, max)
  }
  return n - max;
}

const isInSameLine = ([x1, y1], [x2, y2], [x3, y3]) => {
  return (y2 - y1) * (x3 - x1) === (y3 - y1) * (x2 - x1);
}
// Run the solution
solve();
