/**
 * @param {string[][]} access_times
 * @return {string[]}
 */

function parseToMinute(a) {
    const beginA = Number(a.slice(0, 2))
    const endA = Number(a.slice(2, 4));
    return beginA * 60 + endA;
}
function isInTime(a, b) {
    return parseToMinute(b) - parseToMinute(a) < 60

}
var findHighAccessEmployees = function (access_times) {
    const map = new Map()
    access_times.forEach(access => {
        if (!map.has(access[0])) {
            map.set(access[0], [access[1]])
        } else {
            map.get(access[0]).push(access[1])
        }
    })


    const result = []
    for (key of map.keys()) {
        const employeeTimes = map.get(key)
        employeeTimes.sort()

        for (let i = 0; i < employeeTimes.length - 2; i++) {
            if (isInTime(employeeTimes[i], employeeTimes[i + 1])
                && isInTime(employeeTimes[i], employeeTimes[i + 2])
            ) {
                result.push(key)
                break
            }

        }
    }
    return result;

};
console.log(findHighAccessEmployees([["akuhmu", "0454"], ["aywtqh", "0523"], ["akuhmu", "0518"], ["ihhkc", "0439"], ["ihhkc", "0508"], ["akuhmu", "0529"], ["aywtqh", "0530"], ["aywtqh", "0419"]]
))


console.log(isInTime('0419', '0530'))