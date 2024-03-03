/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
var findChampion = function (n, edges) {
    const set = new Set();
    for ([u, v] of edges) {
        set.add(v);
    }
    let result = -1;
    for (let i = 0; i < n; i++) {
        if (!set.has(i)) {
            if (result === -1) {
                result = i;
            } else {
                return - 1
            }
        }
    }
    return result;
};
