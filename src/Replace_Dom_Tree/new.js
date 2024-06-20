// originalText contains the text and tag
// return the text with <tag></tag>
export const parse = (originalText, selectedText) => {
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
    if (isNotInTag && originalText[i] !== '\n') {
      textNoTag += originalText[i];
      posOfTextNoTag.push(i)
    }
  }

  const startPos = textNoTag.indexOf(selectedText);
  if (startPos === -1) return {
    result: originalText,
    startIndex: undefined,
    endIndex: undefined
  };

  const endPos = startPos + selectedText.length - 1;

  const oriStartPos = posOfTextNoTag[startPos];
  const oriEndPos = posOfTextNoTag[endPos];

  let result = originalText.slice(0, oriStartPos);

  result += '<mark class="select-mark red-mark">';
  let isMarkTagOpen = true;
  for (let i = oriStartPos; i <= oriEndPos; i++) {
    if (originalText[i] === '<') {
      if (isMarkTagOpen) {
        result += '</mark>';
        isMarkTagOpen = false;
      }
      result += originalText[i];
    } else if (originalText[i] === '>') {
      result += originalText[i];
      if (originalText[i + 1] !== '<') {
        result += '<mark class="select-mark red-mark">'
        isMarkTagOpen = true;
      }
    } else {
      result += originalText[i];
    }
  }

  result += '</mark>'
  result += originalText.slice(oriEndPos + 1);

  return { result, startIndex: oriStartPos, endIndex: oriEndPos }
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