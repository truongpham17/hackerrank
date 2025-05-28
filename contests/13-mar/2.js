function validateDom(domString) {
  const tagRegex = /<\/?([a-zA-Z][a-zA-Z0-9]*)\b[^>]*>/g;
  const stack = [];
  let match;


  const readTag = (s, index) => {
    let str = ""
    while (s[index] !== '<') {
      index++
    }
    while (s[index] !== '>') {
      str += s[index]
      index++
    }
    str += s[index + 1]
    return [str, index + 2];
  }
  let index = 0
  while (index < domString.length) {
    const [fullTag, newIndex] = readTag(domString, index)
    index = newIndex;
    const tagName = fullTag.replace("<", "").replace(">", "").replace("</")

    if (fullTag.startsWith("</")) {
      if (stack.length === 0) {
        return tagName;
      }
      const lastTag = stack.pop();
      if (lastTag !== tagName) {
        return lastTag;
      }
    } else {
      stack.push(tagName);
    }
  }

  if (stack.length > 0) {
    return stack[stack.length - 1];
  }
  return true;
}

// Examples:
console.log(validateDom("<div><p>hello friend</p></div>")); // true
console.log(validateDom("<div><p>Hello</p></a>")); // "div"
console.log(validateDom())