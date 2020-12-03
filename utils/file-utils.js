const fs = require('fs');

function parseFileToLines(filename) {
  return fs.readFileSync(filename).toString().split("\n");
}

function parseFileToIntegers(filename) {
  const lines = parseFileToLines(filename);
  return lines.map(line => parseInt(line));
}

module.exports = {
  parseFileToLines,
  parseFileToIntegers
}