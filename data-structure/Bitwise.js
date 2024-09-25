const and = () => {
  let a = 5;  // 0101 in binary
  let b = 3;  // 0011 in binary
  let result = a & b;  // 0001 in binary, which is 1 in decimal
  console.log(result);  // Output: 1
}

const or = () => {
  let a = 5;  // 0101 in binary
  let b = 3;  // 0011 in binary
  let result = a | b;  // 0111 in binary, which is 7 in decimal
  console.log(result);  // Output: 7
}

const xor = () => {
  let a = 5;  // 0101 in binary
  let b = 3;  // 0011 in binary
  let result = a ^ b;  // 0110 in binary, which is 6 in decimal
  console.log(result);  // Output: 6
}

const not = () => {
  let a = 5;  // 0101 in binary
  let result = ~a;  // Inverts to 1010 in binary (which is -6 in two's complement)
  console.log(result);  // Output: -6
}

const leftshift = () => {
  let a = 5;  // 0101 in binary
  let result = a << 1;  // Shifts to 1010 in binary, which is 10 in decimal
  console.log(result);  // Output: 10
}

const rightshift = () => {
  let a = 5;  // 0101 in binary
  let result = a >> 1;  // Shifts to 0010 in binary, which is 2 in decimal
  console.log(result);  // Output: 2
}

const unsignedRightshift = () => {
  let a = -5;  // 11111111111111111111111111111011 in binary
  let result = a >>> 1;  // Shifts to 01111111111111111111111111111101 in binary (2147483645 in decimal)
  console.log(result);  // Output: 2147483645
}

const isOdd = (num) => {
  if (num & 1) {
    return true
  } else {
    return false
  }
}

const swapTwoNumbers = (a, b) => {
  a = a ^ b;  // a becomes 6 (0101 ^ 0011 = 0110)
  b = a ^ b;  // b becomes 5 (0110 ^ 0011 = 0101)
  a = a ^ b;  // a becomes 3 (0110 ^ 0101 = 0011)
  return [a, b]
}

const clearRightmostSetBit = (num) => {
  //12:  1100 in binary
  return num & (num - 1);  // 1100 & 1011 = 1000 (which is 8)
}

const getRightmostSetBit = (num) => num & (-num)

const setRightmostUnsetBit = (num) => {
  return num | (num + 1)
}

const isPowerOfTwo = (num) => {
  return num > 0 && (num & (num - 1)) === 0;
}