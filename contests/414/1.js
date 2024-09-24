/**
 * @param {string} date
 * @return {string}
 */
var convertDateToBinary = function(date) {
    const arr = date.split('-')
    return arr.map(i => Number(i).toString(2)).join('-')
};