/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumStrongPairXor = function (nums) {
    nums.sort((a, b) => b - a)
    let maxXor = 0;
    let xorMul = 0;
    for (let i = 0; i < nums.length - 1; i++) {
        if (nums[i] < 2 ** xorMul - 1) continue
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[j] < nums[i] / 2) break;
            maxXor = Math.max(maxXor, nums[i] ^ nums[j])
            xorMul = getBitNumer(maxXor)
        }
    }
    return maxXor
};

function getBitNumer(n) {
    if (n == 0)
        return 0;

    let msb = 0;
    n = Math.floor(n / 2);

    while (n != 0) {
        n = Math.floor(n / 2);
        msb++;
    }
    return msb

}

console.log(maximumStrongPairXor([500, 520, 2500, 3000]))
