const moveToNextChar = (char) => {
  return String.fromCharCode((char.charCodeAt(0) + 1 - 97) % 26 + 97)
}