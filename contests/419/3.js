/**
 * @param {string} s
 * @return {number}
 */
const FIGURE = ['W', 'E', 'F']
var countWinningSequences = function (s) {
  const getPoint = (a, index) => {// compare value of a and index 
    return (FIGURE.indexOf(a) - index + 3) % 3
  }
  const dp = [
    [
      //W
      
    ],
    [
      //E
    ],
    [
      //F
    ]
  ]

  for (let i = 1; i < s.length; i++) {
    // F W E
    dp.push(Array.from({ length: 3 }, () => []))

  }
};