var solution = function (s) {
  let result = 0;
  let temp = '';
  function calculateValue(s) {
    switch (s) {
      case '@':
        return 1;
      case '#':
        return 2;
      case '$':
        return 10;
      case '%':
        return 50;
      case '&':
        return 100;
      case '+':
        return 500;
      case '~':
        return 1000;
      case '@#':
        return 4;
      case '@$':
        return 9;
      case '$%':
        return 40;
      case '$&':
        return 90;
      case '&+':
        return 400;
      case '&~':
        return 900;
      default:
        return 0;
    }
  }
  for (let i = 0; i < s.length; i++) {
    if (temp.length === 0) {
      temp += s[i];
    } else {
      if (temp[0] === '@' && (s[i] === '#' || s[i] === '$')) {
        temp += s[i];
        continue;
      } else if (temp[0] === '$' && (s[i] === '%' || s[i] === '&')) {
        temp += s[i];
        continue;
      } else if (temp[0] === '&' && (s[i] === '+' || s[i] === '~')) {
        temp += s[i];
        continue;
      } else {
        result += Number(calculateValue(temp));
        temp = s[i];
      }
    }
  }
  result += calculateValue(temp);
  // write your solution here
  return result;
};
console.log(solution('&&#@@'));
