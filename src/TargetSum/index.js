function countSubarraysWithSum(arr, targetSum) {
  let s = new Array(arr.length);

  for (let i = 0; i < s.length; i++) {
    s[i] = new Array(targetSum + 1).fill(0);
    s[i][0] = 1;
  }

  s[0][arr[0]] = arr[0] === 0 ? 2 : 1;

  for (let i = 1; i < arr.length; i++) {
    for (let j = 0; j <= targetSum; j++) {
      s[i][j] = s[i - 1][j] + (s[i - 1][j - arr[i]] || 0);
    }
  }
  return s[s.length - 1][targetSum];
}

console.log(countSubarraysWithSum([0, 0, 0, 0, 0, 0, 0, 0, 1], 1)); // Output: 2
