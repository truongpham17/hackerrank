import fs from 'fs';

function readInput() {
  fs.readFile('./source.txt', (err, data) => {
    if (err) {
      return;
    }
    const parsedData = data.toString();
    const lines = parsedData.trim().split('\n');
    const n = Number(lines[0]);
    const values = [];
    for (let i = 1; i <= n; i++) {
      const value = lines[i].split(' ').map((i) => Number(i));
      values.push(value);
    }
    main(values);
  });
}

function main(cheeses) {
  let result = '';
  cheeses.forEach(([single, double, k], index) => {
    const buns = single * 2 + double * 2;
    const meats = single + double * 2;
    result += `Case #${index + 1}: `;
    if (buns >= k + 1 && meats >= k) {
      result += 'YES\n';
    } else {
      result += 'NO\n';
    }
  });

  result = result.slice(0, result.length - 1);
  fs.writeFile('./answer.txt', result, (err) => {
    console.log(err);
    return;
  });
}

readInput();
