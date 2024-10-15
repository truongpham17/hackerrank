const fs = require('fs');

// Read input from a file (example: 'input.txt')
const inputFile = 'input_1.txt';
const outputFile = 'output.txt';

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
  const arr = []
  for (let i = 0; i < N; i++) {
    const values = next().split(' ').map(Number)
    arr.push(values)
  }
  return [N, arr]
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
function solveCase([N, arr]) {
  let min = 1 / arr[0][1]
  let max = 1 / arr[0][0]
  for (let i = 0; i < arr.length; i++) {
    min = Math.max(min, (i + 1) / arr[i][1])
    max = Math.min(max, (i + 1) / arr[i][0])
    if (min > max) break
  }
  if(min === Infinity && max === Infinity) return 0;
  if (min <= max) return min
  return -1
}

// Run the solution
solve();
