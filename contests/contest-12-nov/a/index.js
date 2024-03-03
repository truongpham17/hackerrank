/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumStrongPairXor = function (nums) {
    const length = nums.length;
    let maxXor = -1
    for (let i = 0; i < length; i++) {
        for (let j = i; j < length; j++) {
            if (Math.abs(nums[i] - nums[j]) <= Math.min(nums[i], nums[j])) {
                maxXor = Math.max(maxXor, nums[i] ^ nums[j])
            }
        }
    }
    return maxXor
};

console.log(maximumStrongPairXor([1, 2, 2, 1, 2]))