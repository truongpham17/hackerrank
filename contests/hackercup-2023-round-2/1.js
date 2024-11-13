const fs = require('fs');

// Read input from a file (example: 'input.txt')
const inputFile = 'input_1.txt';
const outputFile = 'output_1.txt';

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
        results.push(`Case #${i + 1}: ${solveCase(caseData) ? 'YES' : 'NO'}`);
    }

    // Write the results to output.txt
    fs.writeFileSync(outputFile, results.join('\n'));
}


// Function to solve an individual test case
function solveCase(arr) {
    const r = arr.length;
    const c = arr[0].length;
    const visited = new Set()

    const space = new Map();
    const dfs = ([x, y], parent) => {
        if (x < 0 || y < 0 || x >= r || y >= c) {
            return
        }
        if (arr[x][y] === '.') {
            if (!space.has(parent)) {
                space.set(parent, new Set())
            }
            space.get(parent).add(toCoord(x, y))
            return
        }

        if (arr[x][y] !== 'W' || visited.has(toCoord(x, y))) {
            return
        }

        visited.add(toCoord(x, y))

        for (const [delX, delY] of DIRECTION) {
            dfs([x + delX, y + delY], parent)
        }
    }
    for (let i = 0; i < r; i++) {
        for (let j = 0; j < c; j++) {
            if (!visited.has(toCoord(i, j)) && arr[i][j] === 'W') {
                dfs([i, j], toCoord(i, j))
            }
        }
    }
    for (const v of space.values()) {
        if (v.size === 1) return true
    }
    return false
}

// utils
const toCoord = (x, y) => x * 1000 + y
const DIRECTION = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0]
]

// Run the solution
solve();
