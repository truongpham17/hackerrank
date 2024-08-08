// 1984A
const print = (x) => {
  console.log(x)
}

const color = (arr) => {
  if (arr[arr.length - 1] === arr[0]) {
    console.log("NO")
    return
  }

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] !== arr[0]) {
      const result = arr.map((_, j) => j === i ? "R" : "B").join('')
      console.log("YES")
      console.log(result)
      return
    }
  }
}

const main = () => {
  const n = Number(readline());
  for (let i = 0; i < n; i++) {
    readline()
    const arr = readline().split(' ').map(i => Number(i))
    color(arr)
  }
}

color([1, 1, 2, 2])
/**
 * YES
RBRR
YES
RBRRR
NO
YES
RBRR
YES
RBR
YES
RBR
YES
RBR

YES
RBRR
YES
BBRBB
NO
YES
RBBR
YES
RRB
YES
BRR
YES
BRB

 */