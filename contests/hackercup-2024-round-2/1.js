const fs = require('fs');

// Read input from a file (example: 'input.txt')
const inputFile = 'cottontail_climb_part_1_input.txt';
const outputFile = 'output1.txt';

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


// Utility function for parsing inputs
function getNextInput() {
  const arr = next().split(' ').map(Number)
  return arr
}


// Function to solve an individual test case
function solveCase([min, max, mul]) {
  const n = min.toString().length
  const m = max.toString().length
  let count = 0;
  for (let i = n; i <= m; i++) {
    if (i % 2 === 1) {
      const good = form(Math.floor(i / 2))
      for (const x of good) {
        const numberX = Number(x)
        if (numberX >= min && numberX <= max) {
          if (largeMod(x, mul) === 0) {
            count++
          }
        }
      }
    }
  }
  return count

}

function largeMod(a, b) {
  // Ensure b is a number since it will fit into normal number range
  let remainder = 0;

  // Process each digit of the large number a
  for (let i = 0; i < a.length; i++) {
    // Create the current number by adding the current digit
    remainder = (remainder * 10 + parseInt(a[i], 10)) % b;
  }

  return remainder;
}

function form(n) {
  const result = []
  let count = 1
  const arr = Array(2 * n + 1).fill(0)
  while (count < 10) {
    for (let i = 0; i < n; i++) {
      arr[i] = count++
    }
    if (count >= 10) break
    arr[n] = count
    for (let i = n + 1; i <= 2 * n; i++) {
      arr[i] = --count
    }
    count++
    result.push(arr.join(''))
  }
  return result
}

// Run the solution
solve();
