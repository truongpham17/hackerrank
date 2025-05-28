/**
 * @param {number[]} pizzas
 * @return {number}
 */
var maxWeight = function (pizzas) {
  pizzas.sort((a, b) => a - b)
  const n = pizzas.length;
  let total = n / 4;
  let highPick = Math.ceil(n / 8)
  let sum = 0;
  for (let i = 0; i < highPick; i++) {
    sum += pizzas.pop();
  }
  while (highPick < total) {
    pizzas.pop();
    sum += pizzas.pop();
    highPick++
  }
  return sum
};
console.log(maxWeight([2, 4, 4, 1, 1, 4, 5, 4, 1, 5, 3, 1, 5, 4, 5, 2]))