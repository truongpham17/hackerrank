// (1x)(2x^-2+1) -> x+2^x-1
// (2x^2+4)(6x^3+3) = 12x^5+24x^3+6x^2+12

function MathChallenge(str) {
  let factors = str.match(/\(([^()]+)\)/g);
  factors = factors.map(f => f.slice(1, -1))
  const parse = (str) => {
    if (str[0] !== '+' && str[0] !== '-') {
      str = '+' + str;
    }
  }
  const regex = /([+-])(\d*)([a-zA-Z]?)(?:\^([+-]?\d+))?/g;
  const terms = []
}


MathChallenge("(2x^2+4)(6x^3+3)")

// ([+/-]{num}[{letter}[{^}[+/-]{num}]]...[[+/-]{num}]...)(copy)