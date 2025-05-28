function multiplyPolynomials(str) {
  // Extract factors (the content between parentheses)
  let factors = str.match(/\(([^()]+)\)/g);
  // Remove the surrounding parentheses
  factors = factors.map(f => f.slice(1, -1));

  function parsePolynomial(poly) {
    // Ensure a leading sign for consistent parsing
    if (poly[0] !== '+' && poly[0] !== '-') {
      poly = '+' + poly;
    }
    const regex = /([+-])(\d*)([a-zA-Z]?)(?:\^([+-]?\d+))?/g;
    const terms = [];
    let match;
    while ((match = regex.exec(poly)) !== null) {
      // match[1]: sign, match[2]: coefficient digits, match[3]: variable (if any), match[4]: exponent (if any)
      let sign = match[1] === '-' ? -1 : 1;
      // If coefficient digits are missing but there's a variable, default coefficient is 1.
      let coefficient = match[2] ? parseInt(match[2], 10) : (match[3] ? 1 : 0);
      coefficient *= sign;
      // Determine exponent: if variable is present but no exponent, exponent is 1; if no variable, exponent is 0.
      let exponent;
      if (match[3] === "") {
        exponent = 0;
      } else {
        exponent = (match[4] !== undefined) ? parseInt(match[4], 10) : 1;
      }
      terms.push({ coefficient, exponent });
    }
    return terms;
  }

  // Parse each polynomial factor
  let poly1 = parsePolynomial(factors[0]);
  let poly2 = parsePolynomial(factors[1]);

  // Multiply the two polynomials term-by-term and combine like exponents
  let resultTerms = {};
  for (let term1 of poly1) {
    for (let term2 of poly2) {
      let newCoef = term1.coefficient * term2.coefficient;
      let newExp = term1.exponent + term2.exponent;
      if (resultTerms[newExp] === undefined) {
        resultTerms[newExp] = 0;
      }
      resultTerms[newExp] += newCoef;
    }
  }

  // Get exponents sorted in descending order
  let exponents = Object.keys(resultTerms)
    .map(Number)
    .sort((a, b) => b - a);

  // Build the output string from the result terms
  let resultStr = "";
  for (let exp of exponents) {
    let coef = resultTerms[exp];
    if (coef === 0) continue;
    // Decide sign: omit '+' for first term if positive.
    let sign = "";
    if (coef > 0 && resultStr !== "") {
      sign = "+";
    } else if (coef < 0) {
      sign = "-";
    }
    let absCoef = Math.abs(coef);
    let termStr = "";
    if (exp === 0) {
      termStr = absCoef.toString();
    } else {
      // Omit coefficient if it's 1 (or -1, since sign is handled) and variable exists.
      termStr = (absCoef !== 1 ? absCoef.toString() : "") + "x";
      if (exp !== 1) {
        termStr += "^" + exp;
      }
    }
    resultStr += sign + termStr;
  }
  return resultStr === "" ? "0" : resultStr;
}

// Example usage:
console.log(multiplyPolynomials("(2y^2+4)(6x^3+3)")); // Outputs: "12x^5+24x^3+6x^2+12"
console.log(multiplyPolynomials("(1x)(2x^-2+1)"));      // Outputs: "x+2x^-1"
