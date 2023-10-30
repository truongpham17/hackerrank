var minIncrementOperations = function (nums, k) {
  const s = [];
  const add = [];
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] >= k) {
      s.push(s[i - 1] || 0);
      add.push(0);
      continue;
    }
    let temp = 0;
    let haveGreater = false;
    if (i - 1 >= 0 && nums[i - 1] + add[i - 1] >= k) {
      temp = add[i - 1];
      haveGreater = true;
    }
    if (i - 2 >= 0 && nums[i - 2] + add[i - 2] >= k) {
      temp += add[i - 2];
      haveGreater = true;
    }
    if (haveGreater) {
      if (k - nums[i] > temp) {
        add.push();
      }
      s.push(Math.min(k - nums[i], temp));
      add.push();
    } else {
      add.push(k - nums[i]);
      s.push(s[i - 3] || 0 + k - nums[i]);
    }
  }
};
