/**
 * @param {number[]} parent
 * @param {string} s
 * @return {boolean[]}
 */
var findAnswer = function (parent, s) {
  const n = parent.length;

  const tree = Array.from({ length: n }, () => []);

  for (let i = 1; i < n; i++) {
    tree[parent[i]].push(i);
  }

  const rs = new Array(n).fill(false);

  // store the value and the length 
  const memoize = Array(n)
  const MOD = 10 ** 9 + 7

  function dfs(x) {
    let l = 0;
    let value = 0;
    for (const y of tree[x]) {
      const [weight, length] = dfs(y)
      value = (value + calculateModX(l, weight)) % MOD;
      l += length;
    }
    value = (value + calculateModX(l, s[x].charCodeAt(0) - 96)) % MOD;
    l += 1;
    memoize[x] = [value, l]
    return memoize[x]
  }

  const memoizeBackward = Array(n)

  function dfsBackward(x) {
    let value = s[x].charCodeAt(0) - 96
    let l = 1

    for (let i = tree[x].length - 1; i >= 0; i--) {
      const y = tree[x][i]
      const [weight, length] = dfsBackward(y)
      value = (value + calculateModX(l, weight)) % MOD;
      l += length;
    }

    memoizeBackward[x] = [value, l]
    return memoizeBackward[x]
  }
  // a bc d = 26^0 + 26^1 * (26^0b + 26^1c) + 26^3(26^0d)
  // ab cd = 26^0a + 26^1b + 26^2(26^0c + 26^1d)
  const a = 'abcd';
  const calculateValue = (x) => {
    let l = 0;
    for (const c of x) {

    }
  }

  dfs(0);
  dfsBackward(0)

  // console.log(memoize, memoizeBackward)

  for (let i = 0; i < n; i++) {
    if (memoize[i][0] === memoizeBackward[i][0]) {
      rs[i] = true
    }
  }
  return rs;
};

const MOD = 10 ** 9 + 7;

// Function to perform modular exponentiation: base**exp % MOD
function modExp(base, exp, mod) {
  let result = 1;
  base = base % mod;

  while (exp > 0) {
    if (exp % 2 === 1) {
      result = (result * base) % mod;
    }
    exp = Math.floor(exp / 2);
    base = (base * base) % mod;
  }
  return result;
}

function modMult(a, b, c) {
  let result = 0;
  a = a % c;

  while (b > 0) {
    // If b is odd, add a to result (mod c)
    if (b % 2 === 1) {
      result = (result + a) % c;
    }

    // Double a and halve b for the next iteration
    a = (a * 2) % c;
    b = Math.floor(b / 2);
  }

  return result;
}


// Function to calculate x % (10**9 + 7)
function calculateModX(a, b) {
  let powerMod = modExp(10, a, MOD);
  let bMod = b % MOD;
  return modMult(powerMod, bMod, MOD)
}


console.log(findAnswer([-1, 16, 0, 1, 0, 12, 2, 15, 2, 11, 0, 8, 10, 6, 18, 16, 0, 4, 1, 6], 'jbebagjfefabgjejdbed'))
// console.log(findAnswer([-1, 3, 0, 2, 9, 7, 1, 2, 7, 12, 0, 7, 7, 12], "ikakdbhhgdbceb"))