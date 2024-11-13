const fs = require('fs');

// Read input from a file (example: 'input.txt')
const inputFile = 'input_1.txt';
const outputFile = 'output2.txt';

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
  const modCount = Array.from({ length: 10 }, () => ({
    left: new DefaultObj(),
    right: new DefaultObj(),
    rightLarger: new DefaultObj(),
    rightSmaller: new DefaultObj()
  }))
  const halfN = Math.floor(n / 2)
  const halfMin = min.toString().substr(halfN + 1)
  const halfM = Math.floor(m / 2)
  const halfMax = max.toString().substr(halfM + 1)
  const build = (curNums, prevValue) => {
    for (let i = prevValue; i < 10; i++) {
      curNums.push(i)
      if (curNums.length >= halfN) {
        const joinNum = curNums.join('')
        if (joinNum.join('') > halfMin && joinNum < halfMax) {
          const div = largeMod(curNums.join(''), mul)
          modCount(curNums.length).left.add(div, 1)
        }
        const reverseNumber = curNums.reverse().join('')
        const reverseDiv = largeMod(reverseNumber, mul)
        modCount(curNums.length).right.add(reverseDiv, 1)
        if (reverseNumber >= halfN) {
          modCount(curNums.length).rightLarger.add(reverseDiv, 1)
        }

        if (reverseNumber <= halfN) {
          modCount(curNums.length).rightSmaller.add(reverseDiv, 1)
        }
      }

      if (curNums.length <= halfM) {
        build(curNums, i)
      }

      curNums.pop()
    }
    build([], 1)
    for(let i = 1; i < 10; i++) {
      // const leftPart = 
    }
  }
}

class DefaultObj {
  constructor() {
    this.obj = {}
  }
  add(key, value) {
    if (!this.obj[key]) {
      this.obj[key] = value
    } else {
      this.obj[key] += value
    }
  }
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

}
console.log(form(5))

// Run the solution
// solve();
