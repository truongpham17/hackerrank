/**
 * @param {number[][]} squares
 * @return {number}
 */
var separateSquares = function (squares) {
  let max = 0;
  let min = 10 ** 10;
  for (const [a, b, c] of squares) {
    if (b < min) {
      min = b
    }
    if (b + c > max) {
      max = b + c
    }
  }
  let l = min;
  let r = max;
  function nearlyEqual(a, b, epsilon = 0.001) {
    return Math.abs(a - b) * 1000 < epsilon
  }

  while (true) {
    if (nearlyEqual(l, r)) return l
    const mid = (l + r) / 2;
    let lower = 0;
    let higher = 0;
    for (const [a, b, c] of squares) {
      if (b < mid) {
        if (b + c <= mid) {
          lower += c ** 2;
        } else {
          lower += (mid - b) * c
        }
      }
      if (b + c >= mid) {
        if (b >= mid) {
          higher += c ** 2;
        } else {
          higher += (b + c - mid) * c
        }
      }
    }
    if (nearlyEqual(higher, lower)) {
      r = mid;
    } else if (lower > higher) {
      r = mid
    } else {
      l = mid
    }
  }
};
console.log(separateSquares([[522261215, 954313664, 461744743], [628661372, 718610752, 21844764], [619734768, 941310679, 91724451], [352367502, 656774918, 591943726], [860247066, 905800565, 853111524], [817098516, 868361139, 817623995], [580894327, 654069233, 691552059], [182377086, 256660052, 911357], [151104008, 908768329, 890809906], [983970552, 992192635, 462847045]]))