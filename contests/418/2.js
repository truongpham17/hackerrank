/**
 * @param {number} n
 * @param {number} k
 * @param {number[][]} invocations
 * @return {number[]}
 */
var remainingMethods = function (n, k, invocations) {
  const check = new Set()
  const invoke = new Set()
  // build connection
  const connect = {}
  for (const [a, b] of invocations) {
    if (!(a in connect)) {
      connect[a] = []
    }
    connect[a].push(b)
  }

  // starting from k
  const checkDFS = (x) => {
    if (check.has(x)) return;
    check.add(x)
    if (connect[x]) {
      for (const link of connect[x]) {
        invoke.add(link)
        checkDFS(link)
      }
    }
  }

  invoke.add(k)

  checkDFS(k)

  const checkAgainDFS = (notInvokeList, invokeList) => {
    const shouldNotInvoke = []
    for (const a of notInvokeList) {
      if (connect[a]) {
        for (const x of connect[a]) {
          if (invokeList.has(x)) {
            shouldNotInvoke.push(x)
            invokeList.delete(x)
          }
        }
      }
    }
    if (shouldNotInvoke.length > 0) {
      return false
    } else {
      return true
    }
  }

  const good = []
  for (let i = 0; i < n; i++) {
    if (!invoke.has(i)) {
      good.push(i)
    }
  }

  const coudRemoveAll = checkAgainDFS(good, invoke)
  if (coudRemoveAll) {
    return good
  } else {
    return Array.from({ length: n }, (_, k) => k)
  }
};

console.log(remainingMethods(3, 2, [[1, 0], [2, 0]]))