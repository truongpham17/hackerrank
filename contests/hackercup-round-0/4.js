const fs = require('fs');

// Read input from a file (example: 'input.txt')
const inputFile = 'input_4.txt';
const outputFile = 'output_4.txt';

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
  const [N, G] = next().split(' ').map(Number)
  const pos = []
  for (let i = 0; i < N; i++) {
    pos.push(Number(next()))
  }
  return [pos, G]
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
function solveCase([pos, G]) {
  pos.sort((a, b) => a - b)
  let minDiff = 10 ** 10
  let rs = -1
  for (let i = 0; i < pos.length; i++) {
    if (Math.abs(G - pos[i]) <= minDiff) {
      minDiff = Math.abs(G - pos[i])
      rs = pos.length - i
    }
  }
  return `${rs} ${minDiff}`
}

// Run the solution
solve();
