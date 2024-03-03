
function minOp(nums1, nums2) {
    const length = nums1.length - 1
    const last1 = nums1[length]
    const last2 = nums2[length]
    let count = 0;
    for (let i = 0; i < length; i++) {
        if (nums1[i] > last1) {
            if (nums2[i] <= last1) {
                count++;
                [nums1[i], nums2[i]] = [nums2[i], nums1[i]]
            } else {
                return -1
            }
        }
    }

    for (let i = 0; i < length; i++) {
        if (nums2[i] > last2) {
            if (nums1[i] <= last2 && nums2[i] <= last1) {
                count++;
                [nums1[i], nums2[i]] = [nums2[i], nums1[i]]
            } else {
                return -1
            }
        }
    }
    return count
}

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var minOperations = function (nums1, nums2) {
    const a = minOp([...nums1], [...nums2])
    const length = nums1.length - 1;
    [nums1[length], nums2[length]] = [nums2[length], nums1[length]]
    const b = minOp([...nums1], [...nums2]) + 1
    if (a === -1 && b === -1) return -1
    return Math.min(a, b)
};
console.log(minOperations([1, 2, 7],
    [4, 5, 3]))