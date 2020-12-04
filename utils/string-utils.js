function leftPad(message, leftSpaces) {
  return `${new Array(leftSpaces).fill(' ').join('')}${message}`;
}

module.exports = {
  leftPad
}