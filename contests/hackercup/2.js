


const fs = require('fs');

function findPrimes(n) {
  let isPrime = new Array(n + 1).fill(true);
  isPrime[0] = isPrime[1] = false; // 0 and 1 are not primes

  for (let i = 2; i * i <= n; i++) {
    if (isPrime[i]) {
      // Mark all multiples of i as non-prime
      for (let j = i * i; j <= n; j += i) {
        isPrime[j] = false;
      }
    }
  }

  let primes = [];
  for (let i = 2; i <= n; i++) {
    if (isPrime[i]) {
      primes.push(i);
    }
  }

  return primes;
}

const primes = findPrimes(10000000)

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
  return Number(next())
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
function solveCase(n) {
  const set = new Set();
  const result = new Set();
  let i = 0;
  while (primes[i] <= n && i < primes.length) {
    set.add(primes[i])
    i++
  }

  i = 0;
  while (primes[i] <= n && i < primes.length) {
    for (let j = 0; j < i; j++) {
      if (i > 0 && primes[j] > primes[i] - primes[i - 1]) break
      if (primes[j] * 2 > primes[i]) break
      if (set.has(primes[i] - primes[j])) {
        result.add(primes[i] - primes[j])
        result.add(primes[j])
        break
      }
    }
    i++
  }
  return result.size
}

// Run the solution
solve();
