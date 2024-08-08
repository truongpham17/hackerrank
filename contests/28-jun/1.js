/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canAliceWin = function(nums) {
    const single = nums.reduce((sum, cur) => cur < 10 ? sum + cur : sum, 0)
    const total = nums.reduce((sum, cur) => sum + cur, 0)
    return total !== single * 2
};