/**
 * @param {number[]} nums
 * @return {number}
 */
var maxBalancedSubsequenceSum = function (nums) {
    const dp = [];
    const l = nums.length
    dp.length = l;
    dp[0] = nums[0];
    const holdValues = [];

    for (let i = 1; i < l; i++) {
        let max_prev = -Number.MAX_SAFE_INTEGER;
        for (let j = i - 1; j >= 0; j--) {
            if (nums[j] - j <= nums[i] - i) {
                max_prev = dp[j]
                break;
            }
        }
        dp[i] = Math.max(nums[i], dp[i - 1], max_prev + nums[i])
    }
    return dp[l - 1]
};