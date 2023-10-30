function sumWithLength(n) {
  const color = new Array(10).fill(false);
  let l = 0;
  let str = '';
  let result = 0;
  function addSum() {
    if (l === n) {
      result++;
      return;
    }
    for (let i = l === 0 ? 1 : 0; i <= 9; i++) {
      if (!color[i]) {
        str += i;
        color[i] = true;
        l++;
        addSum();
        l--;
        str = str.slice(0, -1);
        color[i] = false;
      }
    }
  }

  addSum();
  return result;
}

function main() {
  let result = [];
  for (let i = 0; i <= 8; i++) {
    result.push(i === 0 ? sumWithLength(i) : result[i - 1] + sumWithLength(i));
  }

  console.log(result);
}

main();
