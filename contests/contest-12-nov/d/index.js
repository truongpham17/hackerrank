/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumStrongPairXor = function (nums) {
    const maxValue = nums.reduce((m, a) => Math.max(m, a), -1);
    const maxBit = getBitNumer(maxValue);

    function dfs(bitIndex, bitValue, arr) {
        arr.filter(i => (i >> bitIndex) & 1 !== bitValue)
        dfs(bitIndex - 1, bitValue ^ 1, arr)

    }
    function splitArr(bitIndex, arr1, arr2) {
        const arr1_1 = arr1.filter(i => i >> bitIndex & 1 === 1)
        const arr1_0 = arr1.filter(i => i >> bitIndex & 1 === 0)
        const arr2_1 = arr2.filter(i => i >> bitIndex & 1 === 1)
        const arr2_0 = arr2.filter(i => i >> bitIndex & 1 === 0)
        let canSplit = false
        if (arr1_1.length > 0 && arr2_0.length > 0) {
            splitArr(arr1_1, arr2_0)
        }
        if (arr1_0.length > 0 && arr2_1.length > 0) {
            splitArr(arr1_0, arr2_0)
        }

    }

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