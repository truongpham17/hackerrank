/**
 * @param {number[][]} grid
 * @return {number}
 */
var findChampion = function (grid) {
    let champion = -1
    for (let i = 0; i < grid.length; i++) {
        let isChampion = true;
        for (let j = 0; j < grid.length; j++) {
            if (i === j) continue;
            if (grid[j][i] === 1) {
                isChampion = false;
                break
            }
        }
        if (isChampion) {
            champion = i;
            break;
        }
    }
    return champion
};