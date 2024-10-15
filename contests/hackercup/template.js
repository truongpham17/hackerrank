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
    const [N, K] = next().split(' ').map(Number)
    const arr = []
    for (let i = 0; i < N; i++) {
        const value = next()
        arr.push(Number(value))
    }
    return [N, K, arr]
}

// Solution function
function solve() {
    const n = Number(next())

    const results = [];

    for (let i = 0; i < n; i++) {
        // read here
        const caseData = getNextInput()
        // Solve each test case and store the result
        results.push(`Case #${i + 1}: ${solveCase(caseData) ? 'YES' : 'NO'}`);
    }

    // Write the results to output.txt
    fs.writeFileSync(outputFile, results.join('\n'));
}

// Function to solve an individual test case
function solveCase([N, K, arr]) {
    const min = Math.min(...arr)
    if (N < 2) return min <= K;
    return min + (N - 2) * min * 2 <= K
}

// Run the solution
solve();
