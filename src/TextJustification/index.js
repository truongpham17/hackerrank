// source: https://leetcode.com/problems/text-justification/
// difficulty level: HARD
/**
 * @param {string[]} words
 * @param {number} maxWidth
 * @return {string[]}
 */
var fullJustify = function (words, maxWidth) {
  const array = [];
  let innerWords = [];
  let currentLength = 0;

  function generateSpace(count) {
    let s = '';
    for (let i = 0; i < count; i++) {
      s += ' ';
    }
    return s;
  }
  for (let i = 0; i < words.length; i++) {
    if (currentLength + words[i].length < maxWidth) {
      innerWords.push(words[i]);
      currentLength += words[i].length + 1;
    } else {
      currentLength = words[i].length;
      array.push(innerWords);
      innerWords = [words[i]];
    }
  }
  if (innerWords.length > 0) {
    array.push(innerWords);
  }
  return array.map((innerWords, index) => {
    const currentTotalWidth = innerWords.reduce((sum, a) => sum + a.length, 0);
    const spaceRequired = Math.ceil(
      (maxWidth - currentTotalWidth) / Math.max(innerWords.length - 1, 1)
    );
    const totalSpaceAllowed = maxWidth - currentTotalWidth;
    let result = '';
    let accumulateSpace = 0;
    const isFinalString = index === array.length - 1;

    for (let i = 0; i < innerWords.length; i++) {
      result += innerWords[i];
      const spaceAdded = Math.min(
        totalSpaceAllowed - accumulateSpace,
        spaceRequired,
        isFinalString ? 1 : Number.MAX_SAFE_INTEGER
      );
      result += generateSpace(spaceAdded);
      accumulateSpace += spaceAdded;
    }
    if (result.length < maxWidth) {
      result += generateSpace(maxWidth - result.length);
    }
    return result;
  });
};

console.log(
  fullJustify(
    [
      'Science',
      'is',
      'what',
      'we',
      'understand',
      'well',
      'enough',
      'to',
      'explain',
      'to',
      'a',
      'computer.',
      'Art',
      'is',
      'everything',
      'else',
      'we',
      'do',
    ],
    20
  )
);
