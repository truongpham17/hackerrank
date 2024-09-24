/**
 * @param {string[]} message
 * @param {string[]} bannedWords
 * @return {boolean}
 */
var reportSpam = function(message, bannedWords) {
    const set = new Set()
    for(const word of bannedWords) {
      set.add(word)
    }
    let count = 0;
    for(const m of message) {
      if(set.has(m)) {
        count++
      }
      if(count>=2){
        return true
      }
    }
    return false
};