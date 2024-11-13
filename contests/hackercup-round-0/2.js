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
  const [N, K] = next().split(' ').map(Number)
  return [N, K]
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
function solveCase([N, K]) {
  return (Math.pow((K / 100), (N - 1) / (N)) - K / 100) * 100
}

// Run the solution
solve();
