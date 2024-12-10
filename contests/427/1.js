/**
 * @param {number[]} nums
 * @return {number[]}
 */
var constructTransformedArray = function (nums) {
  const move = (i) => {
    return nums[(i + nums[i] % nums.length + nums.length) % (nums.length)]
  }
  return nums.map((_, index) => move(index))
};
console.log(constructTransformedArray([3]))