// originalText contains the text and tag
// return the text with <tag></tag>
const parse = (originalText, selectedText) => {
  let textNoTag = '';
  const posOfTextNoTag = [];
  let isNotInTag = true;
  for (let i = 0; i < originalText.length; i++) {
    if (originalText[i] === '<') {
      isNotInTag = false
      continue;
    }

    if (originalText[i] === '>') {
      isNotInTag = true
      continue;
    }
    if (isNotInTag) {
      textNoTag += originalText[i];
      posOfTextNoTag.push(i)
    }
  }

  const startPos = textNoTag.indexOf(selectedText);
  if (startPos === -1) return originalText;
  const endPos = startPos + selectedText.length - 1;

  const oriStartPos = posOfTextNoTag[startPos];
  const oriEndPos = posOfTextNoTag[endPos];

  let result = originalText.slice(0, oriStartPos);

  const tagStack = getUnclosedTags(originalText.slice(0, oriStartPos));
  console.log("🚀 ~ parse ~ tagStack:", tagStack)

  tagStack.forEach(tag => {
    result += getCloseTag(tag)
  });

  for (let i = tagStack.length - 1; i >= 0; i--) {
    result += getCloseTag(tagStack[i])
  }
  result += '<tag>';

  for (const tag of tagStack) {
    result += tag;
  }

  result += originalText.slice(oriStartPos, oriEndPos + 1);

  const uncloseTagInside = getUnclosedTags(originalText.slice(oriStartPos, oriEndPos + 1));
  for (let i = uncloseTagInside.length - 1; i >= 0; i--) {
    result += getCloseTag(uncloseTagInside[i])
  }

  result += '</tag>';

  for (let i = 0; i < uncloseTagInside.length; i++) {
    result += uncloseTagInside[i]
  }

  result += originalText.slice(oriEndPos + 1, originalText.length)

  return { result, startIndex: oriStartPos, endIndex: oriEndPos }
}

const getCloseTag = (tag) => {
  return tag.slice(0, tag.length - 1) + '/' + '>'
}


const getUnclosedTags = (str) => {
  let tempTag = '';
  let foundTag = false;
  const tagStack = []

  for (let i = 0; i < str.length - 1; i++) {
    if (str[i] === '<') {
      tempTag = str[i];
      foundTag = true;
    }

    else if (str[i] === '>') {
      tempTag += str[i];
      const isCloseTag = tempTag.includes('</') || tempTag.includes(' />')
      if (isCloseTag) {
        tagStack.pop()
      } else {
        tagStack.push(tempTag);
      }

      tempTag = ''
      foundTag = false;
    }
    else if (foundTag) {
      tempTag += str[i]
    }
  }
  return tagStack;
}

const convert = (str, arr) => {
  if (!arr.length) return str;
  let result = str.slice(0, arr[0].start);

  for (let i = 0; i < arr.length; i++) {
    result += `<tag>${str.slice(start, end + 1)}</tag>`
    result += str.slice(arr[i].end + 1, arr[i + 1]?.start || str.length)
  }

  return result;
}

console.log(parse(`
  <h1 class="heading">Kärcher Battery Power+</h1>
  <p>
    <strong>Eine Plattform - alle Möglichkeiten</strong>
    <p></p>
    <p>
      In unserer Kärcher Battery Power+-Plattform sind alle Kärcher 18- oder 36-Volt-Geräte mit demselben Akku kompatibel. Das ermöglicht Ihnen effektive Reinigung und Pflege - drinnen wie draußen. Profitieren Sie von zuverlässigen Laufzeiten und mehr Produktivität. Kabellose Freiheit bei allen Anwendungen - egal ob bei der Reinigung des Flugzeuginnenraums oder bei der Parkpflege.
    </p>
  </p>
      `, 'serer Kärcher Battery Power+-Plattfor'))