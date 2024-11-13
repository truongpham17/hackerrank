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
  const [str, K] = next().split(' ')
  return [str, K]
}

// Solution function
function solve() {
  const n = Number(next())

  const results = [];

  for (let i = 0; i < n; i++) {
    // read here
    const caseData = getNextInput()
    // Solve each test case and store the result
    results.push(`Case #${i + 1}: ${solveCase(caseData)[0]} ${solveCase(caseData)[1]}`);
  }

  // Write the results to output.txt
  fs.writeFileSync(outputFile, results.join('\n'));
}

// Function to solve an individual test case
function solveCase([str, K]) {
  const markPos = []
  const values = []
  for (let i = 0; i < str.length; i++) {
    if (str[i] === '?') {
      markPos.push(i)
      values.push(2)
    } else {
      values.push(Number(str[i]))
    }
  }

  const tryToIncrease = (i) => {
    let max = values[i]
    if (i > 0) {
      switch (values[i - 1]) {
        case 2: max = Math.max(max, 6); break;
        default: max = 9; break
      }
    }

    // can change 
    if (i < values.length - 1) {
      if (values[i + 1] <= 6) {
        max = Math.min(max, 2)
      } else {
        max = Math.min(max, 1)
      }
    }
    return max
  }

  for (let i = 0; i < markPos.length; i++) {
    const pos = markPos[i]
    values[pos] = tryToIncrease(pos)
  }

  // maximum number
  const maxRs = []
  for (const pos of markPos) {
    maxRs.push(values[pos])
  }

  let count = 1
  for (const v of maxRs) {
    count *= v
    count %= 998244353
  }
  const checkState = (arr, curIndex) => {
    let count = 0;
    if (curIndex > 0 && arr[curIndex - 1] * 10 * arr[curIndex] < 26) {
      count++
    }
    if (curIndex < arr.length - 1 && arr[curIndex] !== 0 && arr[curIndex] * 10 + arr[curIndex + 1] < 26) {
      count++
    }
    return count
  }

  const saveState = [...values]
  const decrease = (pos, curIndex) => {
    const prevState = checkState(values, curIndex)
    let temp = values[pos[curIndex]]

    if (temp > 0) {
      // try to decrease first
      values[pos[curIndex]]--
      if (checkState(values, pos[curIndex]) < prevState) {
        // try to reset
        for (let i = curIndex; i < pos.length; i++) {
          values[pos[i]] = saveState[pos[i]]
        }
        return decrease(pos, curIndex - 1)
      }
    } else {
      // try to reset
      for (let i = curIndex; i < pos.length; i++) {
        values[pos[i]] = saveState[pos[i]]
      }
      return decrease(pos, curIndex - 1)
    }
  }
  for (let i = 0; i < K - 1; i++) {
    decrease(markPos, markPos.length - 1)
  }
  return [values.join(''), count]
}



// Run the solution
solve();
