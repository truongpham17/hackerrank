function countMountains(A, B, M) {
  const AStr = A.toString();
  const BStr = B.toString();
  const maxLen = BStr.length;

  // Helper function to compute the modulus contribution of a reversed string
  function computeReverseMod(leftPart, modM) {
    let mod = 0;
    let multiplier = 1;

    for (let i = leftPart.length - 1; i >= 0; i--) {
      mod = (mod + parseInt(leftPart[i]) * multiplier) % modM;
      multiplier = (multiplier * 10) % modM;
    }

    return mod;
  }

  // Recursive function to build the left part and calculate mod
  function buildLeftPart(currNum, currMod, pos, isLeadingDigit, maxDigits, modM) {
    if (pos > maxDigits) {
      return 0;
    }

    if (currNum.length > 0) {
      // Full length mountain number constructed
      const reverseMod = computeReverseMod(currNum, modM);
      const totalMod = (currMod * Math.pow(10, currNum.length) + reverseMod) % modM;

      const fullNum = currNum + currNum.split('').reverse().slice(1).join('');
      const fullNumValue = BigInt(fullNum);

      if (fullNumValue >= BigInt(A) && fullNumValue <= BigInt(B) && totalMod === 0) {
        return 1;
      }
    }

    let count = 0;
    const startDigit = isLeadingDigit ? 1 : parseInt(currNum[currNum.length - 1]);

    for (let digit = startDigit; digit <= 9; digit++) {
      const newMod = (currMod * 10 + digit) % modM;
      count += buildLeftPart(currNum + digit, newMod, pos + 1, false, maxDigits, modM);
    }

    return count;
  }

  let totalCount = 0;

  for (let len = 1; len <= maxLen; len += 2) {
    const halfLen = Math.floor(len / 2) + 1;
    totalCount += buildLeftPart("", 0, 1, true, halfLen, M);
  }

  return totalCount;
}

// Example usage
const A = 100;
const B = 1000000;
const M = 5;
console.log(countMountains(34432, 9999920, 222)); // Output the count of mountain numbers divisible by M in the range [A, B]
