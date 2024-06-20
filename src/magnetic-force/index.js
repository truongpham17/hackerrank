// https://leetcode.com/problems/magnetic-force-between-two-balls/
// MEDIUM
/**
 * @param {number[]} position
 * @param {number} m
 * @return {number}
 */
var maxDistance = function (position, m) {
    position.sort((a, b) => a - b);
    let start = 1;
    let end = position[position.length - 1] - position[0];
    let result = -1;
    function isMoreExceedM(value) {
        let cur = 0;
        let next = 0;
        let count = 0;

        while (count < m - 1) {
            while (next < position.length && position[next] - position[cur] < value) {
                next += 2
            }

            if (next - 1 >= position.length) {
                return false;
            }

            if (position[next - 1] - position[cur] >= value) {
                next = next - 1
                cur = next;
                count++
            } else if (next >= position.length) {
                return false;
            } else {
                cur = next;
                count++
            }
        }
        return true;
    }

    while (start <= end) {
        const middle = Math.floor((start + end) / 2);
        if (isMoreExceedM(middle)) {
            start = middle + 1;
            result = middle;
        } else {
            end = middle - 1;
        }
    }
    return result;
};


console.log(maxDistance([1, 2, 3, 4, 7], 3))

/**
 * function findIndexWithValueHigher(value, prevIndex) {
        let start = prevIndex + 1;
        let end = position.length - 1;
        let result = -1;
        while (start <= end) {
            const middle = Math.floor((start + end) / 2);
            if (position[middle] - position[prevIndex] >= value) {
                result = middle;
                end = middle - 1
            } else {
                start = middle + 1
            }
        }
        return result;
    }
 */